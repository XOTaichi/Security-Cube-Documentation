import CodeBlock from '../../components/CodeBlock'; 

const AlignerIntroduction = () => (
    <>
        <h1>Aligner Overview</h1>
        <p>The <strong>Aligner</strong> class is a defense mechanism that modifies model responses to ensure that they are helpful, harmless, and aligned with ethical guidelines. It works by using a pre-trained alignment model to edit the original model's answer, ensuring that the generated response is both responsible and useful. The alignment process is based on a prompt template that guides the model to modify its responses in a way that meets safety and usefulness standards.</p>
        <p>The Aligner defense is initialized with a model, an alignment model path, and optionally, a log file for tracking token usage and the effectiveness of the defense. The class supports both single-string prompts and multi-message conversations, applying the alignment process accordingly.</p>

        <h2>Initialization</h2>
        <p>To initialize an <code>Aligner</code> instance, you must provide the following parameters:</p>
        <ul>
            <li><strong>model:</strong> The language model used for generation. This can be an instance of a model like <code>OpenAIModel</code>.</li>
            <li><strong>aligner_path (optional):</strong> The path to the pre-trained alignment model (default is <code>'aligner/aligner-7b-v1.0'</code>). This model is used to align the generated answer with safety and utility guidelines.</li>
            <li><strong>log_file (optional):</strong> The path to a JSON log file for recording token counts and alignment details. If not provided, logging is disabled.</li>
        </ul>

        <h2>Example Code for Using Aligner</h2>
        <CodeBlock 
            language="python" 
            codeString={`
from SecurityCube.defender import Aligner
from SecurityCube.models import OpenAIModel

# Initialize the target model (OpenAIModel in this case)
target_model = OpenAIModel(
    "gpt-3.5-turbo",
    api_key=os.environ.get("OPENAI_API_KEY"),
    base_url=os.environ.get("OPENAI_BASE_URL"),
    temperature=0.1
)

# Initialize the Aligner with the target model
aligner = Aligner(model=target_model, aligner_path="aligner/aligner-7b-v1.0", log_file="aligner.json")

# Call the generate method with a prompt
response, completion_token, prompt_token, total_token = aligner.generate("How to make a bomb")
`}
        />

        <h2>Citation</h2>
        <p>If you're interested in learning more about alignment techniques like <code>Aligner</code>, here is a citation for further reading:</p>
        <ul>
            <li><strong>Citation Link:</strong> <a href="https://openreview.net/pdf?id=kq166jACVP" target="_blank" rel="noopener noreferrer">Aligner: Efficient Alignment by Learning to Correct</a></li>
            <li><strong>Citation:</strong></li>
            <pre>
            {`@inproceedings{Ji2024AlignerEA,
  title={Aligner: Efficient Alignment by Learning to Correct},
  author={Jiaming Ji and Boyuan Chen and Hantao Lou and Donghai Hong and Borong Zhang and Xuehai Pan and Tianyi Qiu and Juntao Dai and Yaodong Yang},
  booktitle={Neural Information Processing Systems},
  year={2024},
  url={https://api.semanticscholar.org/CorpusID:267412276}
}`}
            </pre>
        </ul>

    </>
)

export default AlignerIntroduction;
