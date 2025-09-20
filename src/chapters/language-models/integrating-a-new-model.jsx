import React from 'react';

import CodeBlock from '../../components/CodeBlock'; 

const init = `
def __init__(self, supports_system_prompt: bool = True):
    self.supports_system_prompt = supports_system_prompt`
const prepare = `def _prepare_messages(self, prompt: Union[str, List[ChatMessage]]) -> List[ChatMessage]:
    if isinstance(prompt, str): return [{"role": "user", "content": prompt}]
    messages = copy.deepcopy(prompt)
    if not messages or self.supports_system_prompt: return messages
    if messages[0]['role'] == 'system':
        system = messages.pop(0)
        for m in messages:
            if m['role'] == 'user': m['content'] = f"{system['content']}. {m['content']}"; return messages
        return [{"role": "user", "content": system['content']}]
    return messages
`
const generate = `
@abstractmethod
def generate(self, prompt: Union[str, List[ChatMessage]], **kwargs) -> Tuple[str, int, int, int]:
    """
    Generates a response from a given prompt. This method must be implemented by all subclasses.
    """
    pass`
const continue_generate = `
def continue_generate(self, dialog_hist: List[ChatMessage], query: str, **kwargs) -> Tuple[str, List[ChatMessage], int, int, int]:
    dialog_hist.append({"role": "user", "content": query})
            
    resp, completion_tokens, prompt_tokens, total_tokens = self.generate(
        prompt=dialog_hist, 
        **kwargs
    )

    dialog_hist.append({"role": "assistant", "content": resp})

    return resp, dialog_hist, completion_tokens, prompt_tokens, total_tokens`
const prerequisiteCode = `pip install litellm`;
const step1Code = `# In custom_models.py
from base_model import BaseLanguageModel, ChatMessage # Assuming your base class is in base_model.py
from typing import List, Tuple, Union
import litellm
import os

# Set your API keys if not already done in your environment
# os.environ["OPENAI_API_KEY"] = "your-api-key"

class LiteLLM(BaseLanguageModel):
    """
    An implementation of BaseLanguageModel using the litellm library.
    """
    pass # We will fill this in next.`;
const step2Code = `class LiteLLM(BaseLanguageModel):
    """
    An implementation of BaseLanguageModel using the litellm library.
    """
    def __init__(self, model_name: str, **kwargs):
        """
        Initializes the LiteLLM model wrapper.

        Args:
            model_name (str): The model name to be passed to litellm 
                              (e.g., "gpt-4o", "gemini/gemini-1.5-pro-latest").
        """
        # Call the parent constructor. Most models proxied by litellm support system prompts.
        super().__init__(supports_system_prompt=True)
        self.model_name = model_name
        self.kwargs = kwargs # Store other potential litellm arguments`;
const step3Code = `class LiteLLM(BaseLanguageModel):
    def __init__(self, model_name: str, **kwargs):
        super().__init__(supports_system_prompt=True)
        self.model_name = model_name
        self.kwargs = kwargs

    def generate(self, prompt: Union[str, List[ChatMessage]], **kwargs) -> Tuple[str, int, int, int]:
        """
        Generates a response using the litellm.completion method.
        """
        # 1. Use the inherited helper to prepare the final message list
        messages = self._prepare_messages(prompt)

        # Combine kwargs from initialization and this specific call
        combined_kwargs = {**self.kwargs, **kwargs}

        # 2. Call the litellm API
        response = litellm.completion(
            model=self.model_name,
            messages=messages,
            **combined_kwargs
        )

        # 3. Parse the response object
        response_text = response.choices[0].message.content
        usage = response.usage
        completion_tokens = usage.completion_tokens
        prompt_tokens = usage.prompt_tokens
        total_tokens = usage.total_tokens
        
        # 4. Return the data in the required tuple format
        return response_text, completion_tokens, prompt_tokens, total_tokens`;
const step4Code = `from base_model import BaseLanguageModel, ChatMessage # Assuming your base class is in base_model.py
from typing import List, Tuple, Union
import litellm

class LiteLLM(BaseLanguageModel):
    """
    An implementation of BaseLanguageModel using the litellm library.
    """
    def __init__(self, model_name: str, **kwargs):
        """
        Initializes the LiteLLM model wrapper.

        Args:
            model_name (str): The model name to be passed to litellm 
                              (e.g., "gpt-4o", "claude-3-haiku").
        """
        super().__init__(supports_system_prompt=True)
        self.model_name = model_name
        self.kwargs = kwargs

    def generate(self, prompt: Union[str, List[ChatMessage]], **kwargs) -> Tuple[str, int, int, int]:
        """
        Generates a response using the litellm.completion method.
        """
        messages = self._prepare_messages(prompt)
        combined_kwargs = {**self.kwargs, **kwargs}

        response = litellm.completion(
            model=self.model_name,
            messages=messages,
            **combined_kwargs
        )
        
        response_text = response.choices[0].message.content
        usage = response.usage
        
        return (
            response_text,
            usage.completion_tokens,
            usage.prompt_tokens,
            usage.total_tokens
        )`;
const step5Code = `# In your main application file
# Make sure you have set your API key, e.g., os.environ["OPENAI_API_KEY"] = "..."

from custom_models import LiteLLM

# Initialize the model for OpenAI's gpt-4o
my_model = LiteLLM(model_name="gpt-4o", temperature=0.5)

# --- Simple generation ---
print("--- Simple Generation ---")
resp, c_tokens, p_tokens, t_tokens = my_model.generate("Hello, what is the capital of France?")
print(f"Response: {resp}")
print(f"Tokens Used (Completion/Prompt/Total): {c_tokens}/{p_tokens}/{t_tokens}\\n")

# --- Multi-turn conversation ---
print("--- Multi-Turn Conversation ---")
conversation_history = [
    {"role": "system", "content": "You are a helpful assistant that provides concise answers."}
]

resp, conversation_history, c_tokens, p_tokens, t_tokens = my_model.continue_generate(
    dialog_hist=conversation_history,
    query="What is the capital of Japan?"
)

print(f"Assistant: {resp}")

resp, conversation_history, c_tokens, p_tokens, t_tokens = my_model.continue_generate(
    dialog_hist=conversation_history,
    query="And what is its primary international airport?"
)
print(f"Assistant: {resp}")
print("\\nFinal conversation history:")
print(conversation_history)`;


const LiteLLMTutorial = () => {
  return (
    <article style={{padding: '1rem', fontFamily: 'sans-serif', lineHeight: '1.6'}}>
      <h1>Customizing Your Own Model</h1>
      <p>
        This guide will walk you through the process of extending our framework to support a new language model. 
        By following the contract defined by the <code>BaseLanguageModel</code>, you can integrate virtually 
        any LLM provider with minimal effort. 
      </p>

      {/* --- 新增章节 --- */}
      <h2>Understanding the <code>BaseLanguageModel</code> Contract</h2>
      <p>
        Before we build our custom class, it's important to understand the contract set by the <code>BaseLanguageModel</code>. When you inherit from this base class, you gain access to several helpful methods and are required to implement only one core method.
      </p>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li style={{ marginBottom: '10px' }}>
          <strong><code>generate()</code> (Required to Implement):</strong> This is the only abstract method you <strong>must</strong> implement. Its job is to take a prompt, send it to the specific model's API, and return the response in a standardized tuple format: <code>(response_text, completion_tokens, prompt_tokens, total_tokens)</code>.
          <CodeBlock language="python" codeString={generate} />
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong><code>continue_generate()</code> (Inherited):</strong> This method, which handles multi-turn conversations, is already fully implemented in the base class. It works by calling the <code>generate()</code> method you create. You get this functionality for free.
          <CodeBlock language="python" codeString={continue_generate}/>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong><code>_prepare_messages()</code> (Inherited Helper):</strong> This is a utility method provided by the base class to help you correctly format the list of messages before sending it to the API. This method automatically adapts to different model capabilities—for example, merging the system prompt into the first user prompt if system prompts are unsupported. It also serves as the centralized place to add custom transformations, such as injecting context, formatting, or filtering messages before sending them to the model.
          <CodeBlock language="python" codeString={prepare}/>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong><code>__init__()</code> (Constructor):</strong> When writing your subclass's constructor, you should remember to call <code>super().__init__()</code> to ensure the base class is properly initialized.
          <CodeBlock language="python" codeString={init}/>
        </li>
      </ul>
      <p>
        This design means you only need to focus on the unique API communication logic for your new model, while the framework handles conversation management and data structuring.
      </p>
      {/* --- 新增章节结束 --- */}

      <hr style={{margin: '2rem 0'}} />
      <h2>A Step-by-Step Tutorial</h2>
      
      <h3>Prerequisites</h3>
      <p>
        Before you begin, ensure you have <code>litellm</code> installed and have configured the necessary 
        API keys for the model you intend to use (e.g., <code>OPENAI_API_KEY</code> in your environment variables).
      </p>
      <CodeBlock language="bash" codeString={prerequisiteCode} />

      <hr style={{margin: '2rem 0'}} />

      <h3>Step 1: Create a New Subclass</h3>
      <p>
        First, create a new Python file (e.g., <code>custom_models.py</code>) and define a new class 
        that inherits from <code>BaseLanguageModel</code>.
      </p>
      <CodeBlock language="python" codeString={step1Code} />

      <hr style={{margin: '2rem 0'}} />

      <h3>Step 2: Implement the Constructor (<code>__init__</code>)</h3>
      <p>
        The constructor is where you'll set up any model-specific configurations. For <code>litellm</code>, 
        we need to know which underlying model to call (e.g., <code>"gpt-4o"</code>, <code>"claude-3-haiku"</code>). 
        We'll pass this as an argument.
      </p>
      <p>
        You must also call the parent class's constructor using <code>super().__init__()</code> to ensure 
        the base class is properly initialized. We can keep <code>supports_system_prompt=True</code> since 
        <code>litellm</code> handles this for most modern models.
      </p>
      <CodeBlock language="python" codeString={step2Code} />

      <hr style={{margin: '2rem 0'}} />
      
      <h3>Step 3: Implement the <code>generate</code> Method</h3>
      <p>
        This is the core of the integration. You must implement the <code>generate</code> method, which is marked 
        as an <code>@abstractmethod</code> in the base class. The implementation should follow the steps described in the new section above.
      </p>
      <CodeBlock language="python" codeString={step3Code} />
      
      <hr style={{margin: '2rem 0'}} />

      <h3>Step 4: Putting It All Together (Full Code)</h3>
      <p>
        Here is the complete, ready-to-use class.
      </p>
      <CodeBlock language="python" codeString={step4Code} />

      <hr style={{margin: '2rem 0'}} />

      <h3>Step 5: Usage Example</h3>
      <p>
        Now you can use your new <code>LiteLLM</code> class just like any other model that conforms to the framework. 
        Notice that <code>continue_generate</code> works automatically without any extra implementation because 
        it's part of the base class.
      </p>
      <CodeBlock language="python" codeString={step5Code} />
    </article>
  );
};

export default LiteLLMTutorial;