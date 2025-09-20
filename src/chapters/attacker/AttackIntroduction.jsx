import CodeBlock from '../../components/CodeBlock'; 
const AttackerIntroduction = () => (
  <>
    <h1>Attacker Introduction</h1>
    <p>The <code>AttackerPipeline</code> class, located in <code>SecurityCube/attacker/base.py</code>, serves as an abstract base for building synchronous attack pipelines. It allows attackers to exploit system vulnerabilities, particularly to bypass model safeguards like content moderation. Subclasses implement the <code>run</code> method to generate adversarial prompts based on specific attack goals.</p>

    <h2>AttackerPipeline Class Interface</h2>
    <p>The <code>AttackerPipeline</code> class defines the following key components:</p>
    <ul>
      <li><strong>File location:</strong> <code>SecurityCube/attacker/base.py</code></li>
      <li><strong>Constructor:</strong> The <code>__init__</code> method initializes the attacker pipeline.</li>
      <li><strong>run(goals, target):</strong> This abstract method must be implemented by subclasses to generate adversarial prompts. It takes in:
        <ul>
          <li><code>goals</code>: A list of attack objectives (e.g., "How to make a bomb").</li>
          <li><code>target</code>: The defender to attack.</li>
        </ul>
      </li>
      <li><strong>Returns:</strong> The <code>run</code> method must return a list of dictionaries, where each dictionary contains the results of the attack corresponding to each goal.</li>
    </ul>

    <CodeBlock 
      language="python" 
      codeString={`
from abc import ABC, abstractmethod
from typing import List, Dict, Any

class AttackerPipeline(ABC):
    """
    Abstract base class for asynchronous attacker pipeline.
    """

    def __init__(self):
        super().__init__()

    @abstractmethod
    def run(self, goals: List[str], target: Any) -> List[Dict[str, Any]]:
        """
        Generates adversarial prompts based on goals.

        Parameters:
        goals (List[str]): Attack objectives.
        target (Any): Target model to attack.

        Returns:
        List[Dict[str, Any]]: List of attack results.
        """
        pass  # Abstract method, to be implemented by subclasses.

        # Example result entry:
        # {
        #     "original_question":    # The original attack goal or question.
        #     "adversarial_prompt":   # The adversarial prompt generated.
        #     "target_answer":        # The model's response to the adversarial prompt.
        #     "prompt_token_cost":    # Token cost for generating the adversarial prompt.
        #     "completion_token_cost":  # Token cost for the model's response.
        #     "total_token_cost":     # Total token cost (prompt + response).
        #     "target_prompt_token_cost":  # Token cost for the target model's input prompt.
        #     "target_completion_token_cost":   # Token cost for the target model's response.
        #     "target_total_token_cost": # Total token cost for both input and output of the target model.
        #     "execution_time": # Time taken to execute the entire attack, from prompt generation to model response.,
        #     "round_number": # The current iteration or round of the attack process (useful for multi-round attacks).
        # }

`}
    />

    <h2>Common Types of Jailbreak Attacks</h2>
    <ul>
      <li><strong>Logprobe-based methods:</strong> These methods use information from log probes or gradients to construct harmful prompts aimed at manipulating the system.</li>
      <li><strong>Shuffle-based methods:</strong> Attackers apply benign-looking modifications like scrambling token order or inserting separators to evade detection.</li>
      <li><strong>LLM-based methods:</strong> External language models (LLMs) are used to generate, refine, or optimize adversarial prompts to exploit weaknesses in the target model.</li>
      <li><strong>Multi-round (conversational) attacks:</strong> These attacks rely on turn-by-turn dialogue to incrementally bypass safeguards, often making it harder to detect.</li>
      <li><strong>Flaw-based attacks:</strong> Exploiting specific model vulnerabilities, such as multilingual misalignment, to construct effective jailbreak prompts.</li>
      <li><strong>Strategy-based attacks:</strong> Psychologically or procedurally manipulative prompts are used to influence the model’s behavior and bypass security measures.</li>
      <li><strong>Template-based attacks:</strong> Algorithmic or brute-force generation based on templates or variations, allowing attackers to create a wide range of adversarial prompts.</li>
    </ul>
  </>
);

export default AttackerIntroduction;
