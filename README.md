# LangGraph Experiments
My experiments with LangGraph

<br>

## Experiments

- Exp1-Simple LangGraph example<br>
https://github.com/vbookshelf/LangGraph-Experiments/tree/main/Exp1-Simple%20LangGraph%20example#exp1-simple-langgraph-example

- Exp2 - My LangGraph workflow<br>
https://github.com/vbookshelf/LangGraph-Experiments/tree/main/Exp2-My%20LangGraph%20workflow

- Exp3 - Build an agent that runs the ReAct pattern using my LangGraph workflow<br>
https://github.com/vbookshelf/LangGraph-Experiments/tree/main/Exp3-ReAct%20pattern%20w%20my%20langgraph%20workflow

- Exp4 - Use keyword generation instead of a ReAct pattern (re-implement exp3)<br>
(Good example of my custom LangGraph workflow)<br>
https://github.com/vbookshelf/LangGraph-Experiments/tree/main/Exp4-Use%20keyword%20generation%20instead%20of%20a%20ReAct%20pattern

- Exp5 - Create the exp2 email responder system without using LangGraph<br>
(My agentt workflow)<br>
https://github.com/vbookshelf/LangGraph-Experiments/tree/main/Exp5-Create%20exp2%20email%20responder%20without%20using%20LangGraph

- Exp6 - Create ReAct pattern using my agentic function workflow<br>
  (Dog weights and calculations example)<br>
https://github.com/vbookshelf/LangGraph-Experiments/tree/main/Exp6-Create%20ReAct%20pattern%20using%20my%20agentic%20function%20workflow

- Exp7 - Adding chat to exp6 React pattern using my agentic functions<br>
  (Has a basic chat interface in the notebook - python user input with "while True" loop)<br>
  https://github.com/vbookshelf/LangGraph-Experiments/tree/main/Exp7-Adding%20chat%20to%20exp6%20React%20pattern%20using%20my%20agentic%20functions

- Exp8 - Create ReAct agent research assistant using gemini 1.5 flash api<br>
https://github.com/vbookshelf/LangGraph-Experiments/tree/main/Exp8-Create%20ReAct%20agent%20using%20gemini%20flash%20api

<br>

## Lessons Learned

- It's easy to build simple agentic workflows without using LangChain or LangGraph (see exp5).
- It's a lot less code when LangGraph is not used.
- In a ReAct workflow the model can sometimes try to call all functions, that it needs to answer a question, at the sme time. It outputs a list of functions to be called.
