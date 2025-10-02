import CodeBlock from '../../components/CodeBlock';

const LatentGuardIntroduction = () => (
  <>
    <h1>LatentGuard Overview</h1>

    <p>
      The <strong>LatentGuard</strong> class is a defender pipeline that defends model generations
      by inspecting intermediate hidden states. It wraps a target model and uses a "weak→strong" explanation
      pipeline (e.g., a lightweight probe + stronger classifier) to detect malicious or jailbreak prompts
      before allowing the target model to generate, or to pre-filter/replace unsafe outputs.
    </p>

    <h2>Initialization parameters</h2>
    <p>To create a <code>LatentGuard</code> instance, the important parameters are:</p>
    <table className="param-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>model</strong></td>
      <td>The target model wrapped by the guard. Typically, this would be a light wrapper such as <code>Model(OpenAIModel(...))</code>, where the <code>OpenAIModel</code> is the language model being protected.</td>
    </tr>
    <tr>
      <td><strong>guard_model_path</strong></td>
      <td>Path or Hugging Face model ID of the guard model that is used to extract hidden states. For example, <code>"models/Llama-2-7b-chat-hf"</code>.</td>
    </tr>
    <tr>
      <td><strong>guard_model_name (optional)</strong></td>
      <td>Model ID string used for bookkeeping or naming purposes when training. This is useful for tracking and saving the model's state.</td>
    </tr>
    <tr>
      <td><strong>svm_model_path</strong></td>
      <td>Path to load/save the SVM classifier. By default, this points to the latent folder in the repository.</td>
    </tr>
    <tr>
      <td><strong>mlp_model_path</strong></td>
      <td>Path to load/save the MLP classifier. Similar to <code>svm_model_path</code>, but for the MLP model.</td>
    </tr>
    <tr>
      <td><strong>train</strong></td>
      <td>A boolean flag. If <code>True</code>, LatentGuard will call <code>load_exp_data(...)</code> and train the weak→strong classifiers. If <code>False</code> (default), it will load existing classifiers for inference and will not train.</td>
    </tr>
    <tr>
      <td><strong>log_file (optional)</strong></td>
      <td>Path for logging decisions, token counts, and metadata related to the guard's operation. If not provided, logging is disabled.</td>
    </tr>
  </tbody>
</table>


    <h2>Behavior difference: <code>train=True</code> vs <code>train=False</code></h2>
    <p>
      <strong><code>train=True</code></strong>:
      <ol>
        <li>LatentGuard loads experiment data by calling <code>load_exp_data(use_conv=True, model_name=...)</code>.</li>
        <li>It trains one or more classifiers (SVM and/or MLP) on hidden-state representations extracted from the guard model.</li>
        <li>Trained artifacts are saved to the provided <code>svm_model_path</code> and <code>mlp_model_path</code>.</li>
        <li>Useful when you want to re-fit classifiers on new model or augmented datasets.</li>
      </ol>
    </p>
    <p>
      <strong><code>train=False</code></strong>:
      <ol>
        <li>LatentGuard attempts to load pre-trained classifiers from <code>svm_model_path</code> and <code>mlp_model_path</code>.</li>
        <li>It runs only the detection/inference flow and returns or blocks responses according to the classifier outputs.</li>
        <li>Recommended for production/serving where training should not happen at request time.</li>
      </ol>
    </p>

    <h2>Example: training mode (<code>train=True</code>)</h2>
    <CodeBlock
      language="python"
      codeString={`
# train_latentguard.py
import os
from pathlib import Path
import sys
from SecurityCube.defender import LatentGuard, DefenderPipeline
from SecurityCube.models import OpenAIModel, Model

# set up project path (so imports find SecurityCube)
current_file_path = Path(__file__).resolve()
project_root = current_file_path.parent.parent.parent
if str(project_root) not in sys.path:
    sys.path.append(str(project_root))

# initialize target model (the model being protected)
protected_model = OpenAIModel(
    model_name="gpt-3.5-turbo",
    api_key=os.environ.get("OPENAI_API_KEY"),
    base_url=os.environ.get("OPENAI_BASE_URL"),
    temperature=0.1
)

# Create LatentGuard in training mode.
# It will call load_exp_data(..., model_name=guard_model_name) and train SVM/MLP and save them.
guard = LatentGuard(
    model=Model(protected_model),
    guard_model_path="models/Llama-2-7b-chat-hf",
    guard_model_name="Llama-2-7b-chat-hf",
    svm_model_path="logs/svm.pkl",
    mlp_model_path="logs/mlp.pkl",
    train=True,            # <<-- perform training
    log_file="logs/latentguard_train_log.json"
)

# After training the guard is ready; you can also immediately test it:
result = guard.generate("How to delete system32?")
print("Guard decision / response:", result)
`}
    />

    <h2>Example: inference/serving mode (<code>train=False</code>)</h2>
    <CodeBlock
      language="python"
      codeString={`
# serve_with_latentguard.py
import os
from SecurityCube.defender import LatentGuard, DefenderPipeline
from SecurityCube.models import OpenAIModel, Model

protected_model = OpenAIModel(
    model_name="gpt-3.5-turbo",
    api_key=os.environ.get("OPENAI_API_KEY"),
    base_url=os.environ.get("OPENAI_BASE_URL"),
    temperature=0.1
)

# In inference mode, LatentGuard will load classifiers from the provided paths.
guard = LatentGuard(
    model=Model(protected_model),
    guard_model_path="models/Llama-2-7b-chat-hf",
    guard_model_name="Llama-2-7b-chat-hf",
    svm_model_path="logs/svm.pkl",
    mlp_model_path="logs/mlp.pkl",
    train=False,           # <<-- only inference
    log_file="logs/latentguard_infer_log.json"
)

# Use guard.generate(...) just like the target model's generate
response = guard.generate("How to kill a process on my computer?")
print("Guarded response:", response)
`}
    />
    
    <h2>Citation</h2>
    <pre>
{`@inproceedings{zhou-etal-2024-alignment,
  title = "How Alignment and Jailbreak Work: Explain {LLM} Safety through Intermediate Hidden States",
  author = "Zhou, Zhenhong  and
    Yu, Haiyang  and
    Zhang, Xinghua  and
    Xu, Rongwu  and
    Huang, Fei  and
    Li, Yongbin",
  booktitle = "Findings of the Association for Computational Linguistics: EMNLP 2024",
  month = nov,
  year = "2024",
  address = "Miami, Florida, USA",
  publisher = "Association for Computational Linguistics",
  url = "https://aclanthology.org/2024.findings-emnlp.139/",
  doi = "10.18653/v1/2024.findings-emnlp.139",
  pages = "2461--2488"
}`}
    </pre>
  </>
);

export default LatentGuardIntroduction;
