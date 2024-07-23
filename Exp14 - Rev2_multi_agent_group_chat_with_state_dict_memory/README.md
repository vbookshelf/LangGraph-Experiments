
## Exp14 - Create multi agent group chat with state dict memory

### Objective
- Create a group chat where the user is chatting with two agents at the same time
  
### Notes
- Uses a state dict to store the master chat history and the chat history of each agent.
- Each agent sees the master chat history, therefore it understands the context of the chat when responding.
- Uses Groq and Llama 3 70b.
- Can simulate a panel discussion.
- In the notebook one agent is a psychologist and the other is a historian. The discussion topic is: Are we living in a simulation.
- This approach can be useful when a user wants to understand an issue from different perspectives.
- Runs in a colab notebook.
- Uses the models available on Groq.
