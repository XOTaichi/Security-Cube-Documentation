import React from 'react';

const Installation = () => (
  <>
    <h2>Installation</h2>
    <p>Follow the steps below to set up and run the project:</p>
    <ol>
      <li><strong>Clone the repository:</strong> Open your terminal and run the following command:</li>
      <pre><code>git clone https://github.com/XOTaichi/Security-Cube-Artifact.git</code></pre>
      
      <li><strong>Navigate to the project directory:</strong> Once the repository is cloned, navigate to the project directory:</li>
      <pre><code>cd Security-Cube-Artifact</code></pre>
      
      <li><strong>Create a Conda environment:</strong> Create a new Conda environment with Python 3.11:</li>
      <pre><code>conda create --name securitycube python=3.11 -y</code></pre>
      
      <li><strong>Activate the environment:</strong> Activate the Conda environment:</li>
      <pre><code>conda activate securitycube</code></pre>
      
      <li><strong>Install the dependencies:</strong> Install the required Python dependencies using pip:</li>
      <pre><code>pip install -r requirements.txt</code></pre>
    </ol>
  </>
);

export default Installation;
