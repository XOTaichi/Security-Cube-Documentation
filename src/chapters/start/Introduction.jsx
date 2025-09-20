// src/chapters/attacker/Introduction.jsx

const AttackerIntroduction = () => (
  <>
    {/* 使用 <h1> 作为主标题 */}
    <h1>Introduction</h1>
    <p>This is the introduction for the Attacker. An attacker is an individual or entity that attempts to gain unauthorized access to a system, network, or data. Their motivations can vary widely, from financial gain to espionage or simply mischief.</p>
    <p>We will explore various types of attackers and their common methodologies.</p>

    {/* 使用 <h2> 作为次级标题 */}
    <h2>Common Types of Attacks</h2>
    <ul>
      <li><strong>Phishing:</strong> Deceiving users into providing sensitive information.</li>
      <li><strong>Malware:</strong> Installing malicious software like viruses or ransomware.</li>
      <li><strong>Denial-of-Service (DoS):</strong> Overwhelming a system to make it unavailable to users.</li>
      <li><strong>SQL Injection:</strong> Exploiting vulnerabilities in database queries.</li>
    </ul>
  </>
);

export default AttackerIntroduction;