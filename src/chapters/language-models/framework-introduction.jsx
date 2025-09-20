import CodeBlock from '../../components/CodeBlock'; 
const FrameworkIntroduction = () => (
  <>
    {/* <h1>Overview</h1>
    <p>We provide a flexible framework for <strong>seamless interaction with various Large Language Models (LLMs)</strong>, like OpenAI and HuggingFace.</p>

    <h2>Core Philosophy</h2>
    <p>The heart of this framework is the <code>BaseLanguageModel</code> class located in <code>SecurityCube/models/base.py</code>. It offers a standardized interface for LLM interactions, ensuring consistency across different models. Key benefits include:</p>
    <ul>
      <li><strong>Unified Interface:</strong> Easily interact with different models (e.g., OpenAI, HuggingFace) through the same API.</li>
      <li><strong>Easy Extension:</strong> Add new LLMs by inheriting the base class and implementing model-specific methods.</li>
    </ul> */}
    <h1>BaseLanguageModel Introduction</h1>
<p>The <code>BaseLanguageModel</code> class, located in <code>SecurityCube/models/base.py</code>, provides a standardized interface for interacting with various language models. It supports essential methods for message handling and prompt generation, which can be extended for specific LLM implementations like OpenAI and HuggingFace.</p>

<h2>BaseLanguageModel Class Interface</h2>
<p>The <code>BaseLanguageModel</code> class defines the following key components:</p>
<ul>
  <li><strong>File location:</strong> <code>SecurityCube/models/base.py</code></li>
  <li><strong>Constructor:</strong> The <code>__init__</code> method initializes the base language model and configures whether the model supports system prompts. By default, it assumes support for system prompts.</li>
  <li><strong>_prepare_messages(prompt):</strong> A helper method that prepares the message list for API calls, handling system prompts correctly based on the model's capabilities.</li>
  <li><strong>generate(prompt, **kwargs):</strong> An abstract method for generating a response from a given prompt. It must be implemented by all subclasses to provide model-specific functionality.</li>
  <li><strong>continue_generate(dialog_hist, query, **kwargs):</strong> A method for continuing a conversation by appending a user query and generating the assistant's response, updating the conversation history.</li>
</ul>

<CodeBlock 
  language="python" 
  codeString={`
from abc import ABC, abstractmethod
from typing import List, Tuple, Union, TypedDict
import copy

class ChatMessage(TypedDict):
    """Represents a single message in a conversation history."""
    role: str
    content: str

class BaseLanguageModel(ABC):
    """
    An abstract base class that defines the standard interface for a language model.
    """

    def __init__(self, supports_system_prompt: bool = True):
        """
        Initializes the base model.

        Args:
            supports_system_prompt (bool): Flag indicating if the model natively supports 
                                           the 'system' role in messages. Defaults to True.
        """
        self.supports_system_prompt = supports_system_prompt

    def _prepare_messages(self, prompt: Union[str, List[ChatMessage]]) -> List[ChatMessage]:
        """
        Prepares the message list for the API call, handling system prompts correctly.

        If the model does not support system prompts, it merges the system prompt
        into the first user message.
        """
        if isinstance(prompt, str):
            return [{"role": "user", "content": prompt}]
        
        # Make a copy to avoid modifying the original list passed by the user
        messages = copy.deepcopy(prompt)

        if not messages or self.supports_system_prompt:
            return messages

        # Handle unsupported system prompt
        if messages[0]['role'] == 'system':
            system_message = messages.pop(0)
            # Find the first user message to prepend the system prompt to
            for message in messages:
                if message['role'] == 'user':
                    message['content'] = f"{system_message['content']}\n\n---\n\n{message['content']}"
                    return messages
            
            # If no user message is found, convert the system message into a user message
            return [{"role": "user", "content": system_message['content']}]

        return messages

    @abstractmethod
    def generate(self, prompt: Union[str, List[ChatMessage]], **kwargs) -> Tuple[str, int, int, int]:
        """
        Generates a response from a given prompt. This method must be implemented by all subclasses.
        """
        pass

    def continue_generate(self, dialog_hist: List[ChatMessage], query: str, **kwargs) -> Tuple[str, List[ChatMessage], int, int, int]:
        """
        Continues a conversation by appending a new user query and generating a response.
        """
        dialog_hist.append({"role": "user", "content": query})
        
        resp, completion_tokens, prompt_tokens, total_tokens = self.generate(
            prompt=dialog_hist, 
            **kwargs
        )
        
        dialog_hist.append({"role": "assistant", "content": resp})
        
        return resp, dialog_hist, completion_tokens, prompt_tokens, total_tokens
`}/>

    <h2>Component Breakdown</h2>
    <ul>
      <li><strong><code>BaseLanguageModel</code>:</strong> The abstract base class defining the core LLM interface.</li>
      <li><strong><code>OpenAIModel</code>, <code>HuggingFaceModel</code>, etc:</strong> Subclasses implementing the actual model-specific logic.</li>
    </ul>
  </>
);

export default FrameworkIntroduction;
