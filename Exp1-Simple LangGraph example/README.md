## Exp1-Simple LangGraph example

### Objective
- Create a simple LangGraph example
- Classify a customer email and then write a draft response..
  
### Notes
- Simplified the example given in the Sam Witteveen tutorial video.
- No conditional edges
- No tools
- The state contains all the variables that go into nodes or come out of nodes. The state gets updated automatically as the grapgh runs.
- Think of a node as a function that takes in a state and then outputs a dict that autonmatically updates the state.
- Think of an edge as an arrow that connects two nodes.
- Nodes use tools internally
- A conditional edge has two arrows.

### Resources

- Creating an AI Agent with LangGraph Llama 3 & Groq<br>
(Sam Witteveen)<br>
https://www.youtube.com/watch?v=lvQ96Ssesfk<br>
