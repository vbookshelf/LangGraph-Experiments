## Exp3 - Build an agent that runs the ReAct pattern using my LangGrapgh workflow

### Objective
- Implement the ReAct (Reason + Act) pattern
- Don't use LangChain to connect to the APIs
- Write my own API code
- Try to minimize LangChain use
- Update the message history outside the state and then add it to the state
  
### Notes
- Always start by drawing the graph, numbering the nodes, numbering the edges and naming all the functions.
- Follow the workflow in the notebook from top to bottom.
- Includes drawing the graph, numbering the nodes and numbering the edges - for easier reference.
- This example includes a conditional edge.
- A graph can be thought of as a set of functions.
- API calls regularly fail.
- API limits can be exceeded.
- This code does not extract the text content from the Tavily search results. It simply gives the raw search results to the model.
- The Deeplearning.Ai short course (AI Agents in LangGraph) shows a different workflow from the one I used here.

### Resources

- Creating an AI Agent with LangGraph Llama 3 & Groq<br>
(Sam Witteveen)<br>
https://www.youtube.com/watch?v=lvQ96Ssesfk<br>

- Deeplearning.Ai short course<br>
AI Agents in LangGraph<br>
(Implements the ReAct pattern in Python and LangGraph)
https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/
