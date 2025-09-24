import React from 'react';

const SecurityCubeIntro = () => (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h1>Security Cube: A Unified Framework for LLM Security</h1>
    <p>
      <strong>Security Cube</strong> is a unified, multidimensional framework designed for comprehensive and flexible evaluation of jailbreak attacks⚔️ and defenses🛡️ in Large Language Models (LLMs). Introduced in our paper <em>"SoK: Robustness in Large Language Models against Jailbreak Attacks"</em>, Security Cube provides:
    </p>
    <ul>
      <li>A structured taxonomy 📚 of jailbreak attacks and defenses,</li>
      <li>An extensible framework 🔧 that standardizes evaluation pipelines,</li>
      <li>A benchmark suite 📊 with datasets and results for fair and reproducible comparison.</li>
    </ul>
    <p>
      Together, these components enable researchers to systematically study, benchmark, and extend methods in the realm of LLM security, <strong>making it easy to conduct comparative experiments and evaluate the effectiveness of new attack or defense methods against existing ones </strong>😄.
    </p>
    
    <h2>Why Security Cube?</h2>
    <p>
      Security Cube allows you to capture multiple perspectives on the robustness of LLMs, offering a detailed evaluation of attack effectiveness and defense robustness. With Security Cube, we aim to address the limitations of current evaluation frameworks that often rely on narrow metrics, like attack success rate (ASR), which fail to capture the full complexity of LLM security.
    </p>

    <h2>Key Features:</h2>
    <ul>
      <li><strong>Comprehensive Evaluation</strong>: Includes over 13 representative jailbreak attacks and 5 defenses to evaluate LLM security from different dimensions.</li>
      <li><strong>Benchmarking</strong>: Conduct in-depth comparative experiments across a variety of attack and defense methods, giving insights into the current state of LLM robustness.</li>
      <li><strong>Scalable and Flexible</strong>: Security Cube allows you to easily integrate new attacks, defenses, and models for custom benchmarking.</li>
      <li><strong>Multiple Metrics</strong>: Evaluate using various metrics to fully capture attack and defense performance.</li>
    </ul>
  </div>
);

export default SecurityCubeIntro;
