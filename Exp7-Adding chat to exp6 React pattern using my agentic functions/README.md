## Exp7 - Adding chat to exp6 React pattern using my agentic functions

### Objective
- Add chat to an agent running a ReAct (Reason + Act) pattern
- User can chat with the agent.
- The agent only does research (runs ReAct) when needed. If the message is simple (like "Hello") then the agent just responds to the message.
- Use only agent functions i.e. don't use LangGraph.
  
### Notes
- The system uses Llama 3 70b running on Groq. Llama3 is a small model but it handles this function calling style workflow quite well.
- The code includes a user input with a "while True" loop. This creates a chat interface in the notebook.
- System message that makes this possible:
```

chat_agent_system_message = """
You are a helpful assistant.

1. You provide polite amswers to simple questions.
If the user's input requires only a simple answer then output your answer as JSON.

Example session:

Question: Hello. How are you?

You output:

{
"Answer": "I'm fine thanks.",
"Status": "DONE"
}



2. You can also run in a loop of Thought, Action, PAUSE, Observation.
At the end of the loop you output an Answer
Use Thought to describe your thoughts about the question you have been asked.
Use Action to run one of the actions available to you - then return PAUSE.
Observation will be the result of running those actions.
Output your response as a JSON string.

Your available actions are:

calculate:
e.g. calculate: 4 * 7 / 3
Runs a calculation and returns the number - uses Python so be sure to use floating point syntax if necessary

average_dog_weight:
e.g. average_dog_weight: Collie
returns average weight of a dog when given the breed

You can only call one action at a time.


Example session:

Question: How much does a Bulldog weigh?
{
    "Thought": "I should look the dogs weight using average_dog_weight",
    "Action": {"function":"average_dog_weight", "input": "Bulldog"},
    "Status": "PAUSE"
}

You will be called again with this:

Observation: A Bulldog weights 51 lbs

You then output:
{
    "Answer": "A bulldog weights 51 lbs",
    "Status": "DONE"
}
""".strip()

 ```

## Resources

- Deeplearning.Ai short course<br>
AI Agents in LangGraph<br>
(Implements the ReAct pattern in Python and LangGraph - Dog weights example)<br>
https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/
