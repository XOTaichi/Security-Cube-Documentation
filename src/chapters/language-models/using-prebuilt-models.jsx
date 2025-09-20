import CodeBlock from '../../components/CodeBlock'; 

const ModelIntroduction = () => (
  <>
    <h1>Supported Models</h1>
    <p>We support various models through a unified interface, including OpenAI, Huggingface, Qwen3, and more.</p>

    <h2>Using OpenAI Model</h2>
    <CodeBlock 
      language="python" 
      codeString={`
from SecurityCube.models import OpenAIModel
import os

# Initialize OpenAI Model with custom generation parameters
test_gpt = OpenAIModel(
    api_key=os.environ.get("OPENAI_API_KEY"), 
    base_url=os.environ.get("OPENAI_BASE_URL"), 
    temperature=0.1,
    model_name="gpt-3.5-turbo"
)

# Generate a response
res = test_gpt.generate("hi")
print(res)

# Expected answer format: ('Hello! How can I assist you today?', 9, 8, 17)
      `}
    />
    <h3>Initialized Parameters</h3>
    <p>The <code>OpenAIModel</code> class is initialized with the following parameters:</p>
    <ul>
      <li><strong>model_name (str):</strong> Name of the model, e.g., "gpt-4", "gpt-3.5-turbo".</li>
      <li><strong>api_key (str):</strong> Your OpenAI API key.</li>
      <li><strong>base_url (str, optional):</strong> Custom base URL for API endpoints. Defaults to <strong>None</strong>.</li>
      <li><strong>supports_system_prompt (bool):</strong> Whether the endpoint supports the system role. Defaults to <strong>True</strong> for OpenAI models.</li>
      <li><strong>kwargs:</strong> Additional generation parameters like `temperature`, `top_p`, and others that define the model's behavior for generating text. These are passed as keyword arguments.</li>
    </ul>

    <h2>Using HuggingFace Model</h2>
    <CodeBlock 
      language="python" 
      codeString={`
from SecurityCube.models import HuggingFaceModel

# Initialize HuggingFace Model with custom generation parameters
test_qwen = HuggingFaceModel(
    model_name="microsoft/Phi-3.5-mini-instruct", 
    temperature=0.1,
    config_dir="config", 
    config_name="phi-3"
)

# Generate a response
res = test_qwen.generate("hi")
print(res)
      `}
    />
    <h3>Initialized Parameters</h3>
    <p>The <code>HuggingFaceModel</code> class is initialized with the following parameters:</p>
    <ul>
      <li><strong>model_name (str):</strong> The path or repository name of the model, e.g., "microsoft/Phi-3.5-mini-instruct".</li>
      <li><strong>config_dir (str):</strong> Directory containing the configuration files for the model (see <a href="https://github.com/chujiezheng/chat_templates">chat_templates</a>).</li>
      <li><strong>config_name (str):</strong> Name of the specific configuration file within <code>config_dir</code>.</li>
      <li><strong>kwargs:</strong> Additional generation parameters like `temperature`, `top_p`, and others that define the model's behavior for generating text. These are passed as keyword arguments.</li>
    </ul>

    <h2>Using QwenReasoning Model</h2>
    <CodeBlock 
      language="python" 
      codeString={`
from SecurityCube.models import QwenReasoningModel
import os

# Initialize QwenReasoning Model with custom generation parameters
test_qwen3 = QwenReasoningModel(
    api_key=os.environ.get("QWEN_API_KEY"), 
    base_url=os.environ.get("QWEN_BASE_URL"),
    temperature=0.1, 
    model_name="qwen3-30b-a3b-thinking-2507", 
    enable_thinking=True, 
    stream=True
)

# Generate a response
res = test_qwen3.generate("hi")
print(res)
      `}
    />
    <h3>Initialized Parameters</h3>
    <p>The <code>QwenReasoningModel</code> class is initialized with the following parameters:</p>
    <ul>
      <li><strong>model_name (str):</strong> Name of the model, e.g., "qwen3-30b-a3b-thinking-2507".</li>
      <li><strong>api_key (str):</strong> Your Qwen API key.</li>
      <li><strong>base_url (str, optional):</strong> Custom base URL for API endpoints.</li>
      <li><strong>stream (bool):</strong> Whether to stream the response or not. Defaults to <strong>False</strong>.</li>
      <li><strong>enable_thinking (bool):</strong> Whether to enable reasoning capability for the model.</li>
      <li><strong>kwargs:</strong> Additional generation parameters like `temperature`, `top_p`, and others.</li>
    </ul>

    <h2>Using OpenAI Embedding Model</h2>
    <CodeBlock 
      language="python" 
      codeString={`
from SecurityCube.models import OpenAIProvider
import os

# Initialize OpenAI Embedding Provider
test_qwen = OpenAIProvider(api_key=os.environ.get("OPENAI_API_KEY"), base_url=os.environ.get("OPENAI_BASE_URL"))

# Encode text into embeddings
text = "This is a sample text to be embedded."
res = test_qwen.encode([text])
print(res)

# Expected output: A list of embeddings for the provided text
      `}
    />
    <h3>Initialized Parameters</h3>
    <p>The <code>OpenAIProvider</code> class is initialized with the following parameters:</p>
    <ul>
      <li><strong>model_name (str):</strong> Name of the model, e.g., "text-embedding-3-small".</li>
      <li><strong>api_key (str):</strong> Your OpenAI API key.</li>
      <li><strong>base_url (str, optional):</strong> Custom base URL for API endpoints.</li>
    </ul>
  </>
);

export default ModelIntroduction;
