### Exp15 - Create a JS web app where the user chats with two agents at the same time

### Objective
- Create a Javascript web app where the user chats with two agents at the same time.
  
### How it works
- User enters a message
- A router agent decides which agent the user's message is directed to or if its directec to all agents
- The the slected agaent then responds to the user's message and it gets printed on the screen. If the message was directed to all agents then all agents respon and their messages get printed on the screen.
- A master chat history is maintained. This master chat history is passed to the agent along with the users message. Therefore, before responding,, the agent can see the full status of the chat, and what other agents have already said
- The master chat history allows all agents "to hear" what others have said, before responding.
- The master chat history contains a time stamp for each user or agent message.
- In addition to the master caht history, each agent also has is own chat history, as per the OpenAi format.

### Notes
- Uses Llama 3 70b running on Groq.
- Each agent has a diferent system message. In this example one agent is a psychologist and the other is an historian. The user and these two agents are taking part in a panel discussion where the topic is: Are we living in a simulation.
- In this scenario the user is the moderator of the panel discussion.
- I found that the agents also have the ability to chat among themselves, although the panel discussion format limits this. If it wasn't a panel discussion they would ask each other questions.
- This is basic code that could be optimized, e.g. to allow agents to direct questions to each other by modifying the router agent.
