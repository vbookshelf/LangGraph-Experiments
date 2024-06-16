## Exp7 - Adding chat to exp6 React pattern using my agentic functions

### Objective
- Add chat to an agent running a ReAct (Reason + Act) pattern
- can chat with the agent.
- The agent only does research (runs ReAct) when needed. If the message is simple (like "Hello") then the agent just responds to the message.
- Use only agent functions i.e. don't use LangGraph.
  
### Notes
- The system uses Llama 3 70b running on Groq. Llama3 is a small model but it handles this function calling style workflow quite well.
- The code includes a user input with a "while True" loop. This creates a chat interface in the notebook.

## Resources

- Deeplearning.Ai short course<br>
AI Agents in LangGraph<br>
(Implements the ReAct pattern in Python and LangGraph - Dog weights example)<br>
https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/
