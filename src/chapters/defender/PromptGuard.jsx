import CodeBlock from '../../components/CodeBlock'; 

const PromptGuardIntroduction = () => (
    <>
        <h1>PromptGuard Overview</h1>
        <p>The <strong>PromptGuard</strong> class is a defense mechanism designed to protect language models by validating generated outputs and ensuring they align with safe content guidelines. It uses a pre-trained model, such as the Llama Guard model, to check whether the model's response complies with safety requirements before forwarding the request to the target model. If the response is deemed unsafe, the model generates a safe alternative message.</p>
        <p>PromptGuard is initialized with a pre-trained model (e.g., Llama Guard) and a target model to defend. Additionally, you can specify a log file to track token usage and defense activities. The class can be used for both individual prompt requests and conversation flows, applying safety checks in a flexible way.</p>
        
        <h2>Initialization</h2>
        <p>To initialize a <code>PromptGuard</code> instance, you must provide the following parameters:</p>
        <ul>
            <li><strong>model:</strong> The language model used for generation. This can be an instance of a model like <code>OpenAIModel</code>.</li>
            <li><strong>prompt_guard_path (optional):</strong> The path to the pre-trained model (default is "meta-llama/Llama-Guard-3-8B"). This model performs safety checks on the generated responses.</li>
            <li><strong>log_file (optional):</strong> The path to a JSON log file for recording token counts and safety checks. If not provided, logging is disabled.</li>
        </ul>

        <h2>Example Code for Using PromptGuard</h2>
        <CodeBlock 
            language="python" 
            codeString={`
from SecurityCube.defender import PromptGuard
from SecurityCube.models import OpenAIModel

# Initialize the target model (OpenAIModel in this case)
target_model = OpenAIModel(
    "gpt-3.5-turbo",
    api_key=os.environ.get("OPENAI_API_KEY"),
    base_url=os.environ.get("OPENAI_BASE_URL"),
    temperature=0.1
)

# Initialize the PromptGuard with the target model
prompt_guard = PromptGuard(model=target_model, 
                            prompt_guard_path="meta-llama/Llama-Guard-3-8B", 
                            log_file="promptguard_log.json")

# Call the generate method with a malicious prompt
response, completion_token, prompt_token, total_token = prompt_guard.generate("How to make a bomb")
`}
        />

        <h2>Citation</h2>
        <p>If you're interested in learning more about defense mechanisms like <code>PromptGuard</code>, here is a citation for further reading:</p>
        <ul>
            <li><strong>Citation Link:</strong> <a href="https://huggingface.co/meta-llama/Llama-Guard-3-8B" target="_blank" rel="noopener noreferrer">Llama Guard Model on Hugging Face</a></li>
            <li><strong>Citation:</strong></li>
            <pre>
            {`@article{Inan2023LlamaGL,
  title={Llama Guard: LLM-based Input-Output Safeguard for Human-AI Conversations},
  author={Hakan Inan and K. Upasani and Jianfeng Chi and Rashi Rungta and Krithika Iyer and Yuning Mao and Michael Tontchev and Qing Hu and Brian Fuller and Davide Testuggine and Madian Khabsa},
  journal={ArXiv},
  year={2023},
  volume={abs/2312.06674},
  url={https://api.semanticscholar.org/CorpusID:266174345}
}`}
            </pre>
        </ul>

    </>
)

export default PromptGuardIntroduction;
