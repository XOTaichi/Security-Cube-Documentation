// src/data/chapterIndex.js

export const chapterIndex = [
  {
    mainTitle: 'Get Started',
    key: 'start',
    subchapters: [
      {
        title: 'Introduction',
        key: 'Introduction'
      },
      {
        title: 'Installation',
        key: 'Installation'
      },
      {
        title: 'Quick Start',
        key: 'QuickStart'
      }
    ],
    
  },
  {
    mainTitle: "Language Models",
    key: "language-models",
    subchapters: [
      {
        title: "Overview",
        key: "framework-introduction"
      },
      {
        type: "group",
        title: "Quick Start",
        key: "quick-start",
        subchapters: [
          {
            title: "Using a Pre-built Model",
            key: "using-prebuilt-models"
          },
          {
            title: "Customizing a New Model",
            key: "integrating-a-new-model"
          }
        ]
      },
      // {
      //   type: "group",
      //   title: "Core Components",
      //   key: "core-components",
      //   subchapters: [
      //     {
      //       title: "BaseLanguageModel Class",
      //       key: "base-language-model-class"
      //     },
      //     {
      //       title: "ChatMessage Type",
      //       key: "chat-message-type"
      //     }
      //   ]
      // }
    ]
  },
  {
    mainTitle: 'Attacker',
    key: 'attacker',
    subchapters: [
      {
        title: 'Attacker Introduction',
        key: 'AttackIntroduction'
      },
      {
        type: 'group',
        title: 'Attack Methods',
        key: 'attack-methods',
        subchapters: [
          {
            type: 'group',
            title: 'Logprobe based',
            key: 'logprobe',
            subchapters: [
              {
                title: 'LLM-Adaptive',
                key: 'LLM-Adaptive'
              }
            ]
          },
          {
            type: 'group',
            title: 'LLM based',
            key: 'llm',
            subchapters: [
              {
                title: 'Pair',
                key: 'Pair'
              },
              {
                title: 'AutoDANTurbo',
                key: 'AutoDANTurbo'
              }
            ]
          },
          {
            type: 'group',
            title: 'Multiround based',
            key: 'multiround',
            subchapters: [
              {
                title: 'ActorAttack',
                key: 'ActorAttack'
              }
            ]
          },
          {
            type: 'group',
            title: 'Strategey based',
            key: 'strategy',
            subchapters: [
              {
                title: 'Pap',
                key: 'Pap'
              },
              {
                title: 'Codeattacker',
                key: 'Codeattacker'
              },
              {
                title: 'Renellm',
                key: 'ReNeLLM'
              }
            ]
          },
          {
            type: 'group',
            title: 'Shuffle based',
            key: 'shuffle',
            subchapters: [
              {
                title: 'Flip',
                key: 'Flip'
              },
              {
                title: 'BON(Best of N)',
                key: 'Bon'
              }
            ]
          },
          {
            type: 'group',
            title: 'flaw based',
            key: 'flaw',
            subchapters: [
              {
                title: 'Multijail',
                key: 'Multijail'
              },
              {
                title: 'CipherChat',
                key: 'CipherChat'
              }
            ]
          },
          {
            type: 'group',
            title: 'template based',
            key: 'template',
            subchapters: [
              {
                title: 'GPTFuzz',
                key: 'GPTFuzz'
              }
            ]
          },
        ]
      },
    ]
  },
  {
    mainTitle: 'Defender',
    key: 'defender',
    subchapters: [
      {
        title: 'Defender Introduction',
        key: 'DefenderIntroduction'
      },
       {
        type: 'group',
        title: 'Defend Methods',
        key: 'defend-methods',
        subchapters: [
          {
            type: 'group',
            title: 'Finetune based',
            key: 'finetune',
            subchapters: [
              {
                title: 'CircuitBreaker',
                key: 'CircuitBreaker'
              }
            ]
          },
          {
            type: 'group',
            title: 'Prefilter based',
            key: 'prefilter',
            subchapters: [
              {
                title: 'PromptGuard',
                key: 'PromptGuard'
              },
              {
                title: 'Hidden State Guard',
                key: 'Hidden_State_Guard'
              }
            ]
          },
          {
            type: 'group',
            title: 'System Prompt based',
            key: 'system prompt',
            subchapters: [
              {
                title: 'SelfReminder',
                key: 'SelfReminder'
              }
            ]
          },
          {
            type: 'group',
            title: 'Postfilter based',
            key: 'postfilter',
            subchapters: [
              {
                title: 'Aligner',
                key: 'Aligner'
              }
            ]
          },
        ]
      },
      
    ]
  },
  // Judger 保持不变...
  {
    mainTitle: 'Judger',
    key: 'judger',
    subchapters: [
      {
        title: 'The Role of the Judger',
        key: 'TheRole'
      },
      {
        title: 'How Judgers Work',
        key: 'HowItWorks'
      }
    ]
  }
];