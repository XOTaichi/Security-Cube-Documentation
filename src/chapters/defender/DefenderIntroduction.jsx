import CodeBlock from '../../components/CodeBlock'; 

const DefenderIntroduction = () => (
  <>
    <h1>Defender Introduction</h1>
    <p>The <code>DefenderPipeline</code> class, located in <code>SecurityCube/defender/base.py</code>, serves as an abstract base for building defender pipelines. It helps in safeguarding models by generating responses that resist adversarial attacks. Subclasses implement the <code>generate</code> method to produce a defense response based on the input prompt.</p>

    <h2>DefenderPipeline Class Interface</h2>
    <p>The <code>DefenderPipeline</code> class defines the following key components:</p>
    <ul>
      <li><strong>File location:</strong> <code>SecurityCube/defender/base.py</code></li>
      <li><strong>Constructor:</strong> The <code>__init__</code> method initializes the defender pipeline.</li>
      <li><strong>formalize(prompt):</strong> This method processes the raw input prompt and formalizes it for the defense pipeline, returning a list of messages with roles.</li>
      <li><strong>generate(prompt):</strong> This abstract method must be implemented by subclasses to generate a defense response. It takes in:
        <ul>
          <li><code>prompt</code>: The input prompt which can be a string or a list of formatted <code>ChatMessage</code> objects.</li>
        </ul>
      </li>
      <li><strong>Returns:</strong> The <code>generate</code> method must return a tuple with the following:
        <ul>
          <li>The generated response text (<code>str</code>).</li>
          <li>Completion tokens used (<code>int</code>).</li>
          <li>Prompt tokens used (<code>int</code>).</li>
          <li>Total tokens used (<code>int</code>).</li>
        </ul>
      </li>
    </ul>

    <CodeBlock 
      language="python" 
      codeString={`
from abc import ABC, abstractmethod
from typing import Union, List, Tuple, Dict, TypedDict

class ChatMessage(TypedDict):
    """Represents a single message in a conversation history."""
    role: str
    content: str


class DefenderPipeline(ABC):
    """
    Abstract base class for a defender pipeline.

    Subclasses must implement the \`generate\` method and can override the
    \`formalize\` method for custom prompt structuring.
    """

    def formalize(self, prompt: str) -> List[ChatMessage]:
        """
        Formalizes the user's input string into a basic message list.
        """
        return [{"role": "user", "content": prompt}]

    @abstractmethod
    def generate(self, prompt: Union[str, List[ChatMessage]]) -> Tuple[str, int, int, int]:
        """
        Generates a response and token counts from the defender pipeline.
        """
        pass

    def get_name(self) -> str:
        """Returns the name of the defender pipeline class."""
        return self.__class__.__name__
`}
    />

    <h2>Common Types of Defense Methods</h2>
    <p>We categorize defense methods into five types based on their deployment stage in the model pipeline:</p>
    <ul>
      <li><strong>Finetune-based:</strong> Enhance robustness by retraining or further aligning the model to specific defense strategies.</li>
      <li><strong>System prompt:</strong> Insert safety instructions at the system prompt level to guide model behavior and prevent unsafe responses.</li>
      <li><strong>Prefilter:</strong> Detect and block malicious inputs before they are processed by the model, often using classifiers or predefined rules.</li>
      <li><strong>Intraprocess:</strong> Intervene during inference by modifying or monitoring the decoding process, ensuring that unsafe content is filtered at runtime.</li>
      <li><strong>Postfilter:</strong> Filter or revise outputs after generation to suppress unsafe or harmful content, ensuring that the final response aligns with safety protocols.</li>
    </ul>
  </>
);

export default DefenderIntroduction;
