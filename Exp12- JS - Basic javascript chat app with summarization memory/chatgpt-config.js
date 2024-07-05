// Notes
// 1. When slicing in js, both indices are included in the slice.
// 2. When slicing in js the original list is always changed,
// that's why we need to slice copies of the original list.


let list = ['item0', 'item1', 'item2', 'item3', 'item4'];

// Remove items starting at index 1, remove 2 items
list_copy1 = list.slice();
list_copy2 = list.slice();

new_list1 = list_copy1.splice(1, 2);

length = list.length;
new_list2 = list_copy2.splice(2, length);

console.log(list)
console.log(new_list1);
console.log(new_list2);


// Config
//-------
// Chat parameters are explained here: https://platform.openai.com/docs/api-reference/chat

// GPT-3-5 specs: https://platform.openai.com/docs/models/gpt-3-5

// Your Groq API Key
const apiKey = "YOUR-API-KEY";


const bot_name = 'Maiya'; // Give the bot a name
const user_name = 'Guest';	// Set your chat name 


const model_type = "llama3-70b-8192";//"llama3-70b-8192"; //mixtral-8x7b-32768

const openai_url = "https://api.groq.com/openai/v1/chat/completions"; 


// If this number plus the number of tokens in the message_history exceed
// the max value for the model (e.g. 4096) then the response from the api will
// an error dict instead of the normal message response. Thos error dict will
// contain an error message saying that the number of tokens for 
// this model has been exceeded.
const max_tokens = 300; //300

// 0 to 2. Higher values like 0.8 will make the output more random, 
// while lower values like 0.2 will make it more focused and deterministic.
// Alter this or top_p but not both.
const temperature = 0.25;

// -2 to 2. Higher values increase the model's likelihood to talk about new topics.
// Reasonable values for the penalty coefficients are around 0.1 to 1.
const presence_penalty = 0.5; 

// -2 to 2. Higher values decrease the model's likelihood to repeat the same line verbatim.
// Reasonable values for the penalty coefficients are around 0.1 to 1.
const frequency_penalty = 2;




// Remove these suffixes. I think removing them makes the chat sound more natural.
// They will sliced off the bot's responses.
// This is done below in the 'Remove suffixes' part of the code.
var suffixes_list = ['How can I help you?', 'How can I assist you today?', 'How can I help you today?', 'Is there anything else you would like to chat about?', 'Is there anything else I can assist you with today?', 'Is there anything I can help you with today?', 'Is there anything else you would like to chat about today?', 'Is there anything else I can assist you with?', '*winks*', '*wink*', '*bats eyelashes*', '*raises an eyebrow*', '*smirks*', '*winking*'];


// The message history is stored in this variable.
// Storing the message history allows the bot to have context memory.

var message_list;
var summary = "None";

const max_messages = 10
const num_messages_to_summ = 5



// System message
system_setup_message = "Your name is " + bot_name + ". You are a helpful assistant.";


const summ_agent_system_message = `
You are an expert at summarizing chats.

When you are given a chat summary and a conversation history, your task is to incorporate 
the new lines of conversation into the existing summary, 
ensuring a seamless integration that captures the essence of the entire dialogue.

When you are given only a conversation history, your task is to summarize the conversation
in a way that captures the essence of the dialogue.

You format your output as JSON with the following key: conversation_summary
Only output JSON. Don't output any additional text.
`;



// Replace newline characters with a space.
// This is important for ensuring that the csv file is created correctly.
// Every line in the csv file ends with a new line character. 
// If there are newline characters in the system message then this causes errors
// when creating and then later loading the csv file.
system_setup_message = system_setup_message.replace(/\n/g, " ");


// Append to message_list. This is the history of chat messages.
message_list = [{"role": "system", "content": system_setup_message}];	





async function makeApiRequest(my_message) {
	
		// Show the spinner while waiting for the response from openai
		create_spinner_div();

	
		// This scrolls the page up by cicking on a div at the bottom of the page.
		// This shows the user's message.
		// Note that if the click is simlated "on page load" then the cursor 
		// will not autofocus in the form input.
		simulateClick('scroll-page-up');
		

	  try {
		  
		// Append to message_list. This is the history of chat messages.
		message_list.push({"role": "user", "content": my_message});
		
		
	    const response = await fetch(openai_url, {
			
	      method: 'POST',
	      headers: {
			Authorization: `Bearer ${apiKey}`,
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
			 model: model_type,
	        messages: message_list,
	        max_tokens: max_tokens,
			temperature: temperature,
			presence_penalty: presence_penalty,
			frequency_penalty: frequency_penalty
	      })
	    })
		
		
		// The API can return:
		// 1- A dict containing the reponse message or
		// 2- A different dict containing the error message.
	    const data = await response.json();
		
		
		// Check if the response dict has a key called 'error'
		if ('error' in data) {
		  
		  // Get the error message and error code
		  var response_text = "Error: " + data['error']['code'] + "<br>" + data['error']['message'];
		  
		  console.log(response_text)
	
		  
		} else { // The response is a dict containing the message
			
			// Get the response text
			var response_text = data['choices'][0]['message']['content'];
			
			console.log(response_text)	
			
		}
			
		
		// Replace the suffixes with "":
		// This removes sentences like: How can I help you today?
		// For each suffix in the list...
		 suffixes_list.forEach(suffix => {
	      
			// Replace the suffix with nothing.
	        response_text = response_text.replace(suffix, "");
			
	  	});
		
		
		
		// *** Remove any html and then speak *** //
		////////////////////////////////////////////
		const cleaned_text = removeHtmlTags(response_text);
		//speak(cleaned_text);
		
		
		
		
		// Format the response so it can be displayed on the web page.
		//var paragraph_response = formatResponse(response_text);
		
		// Applying the function
		var paragraph_response = wrapSentencesWithParagraphs(response_text);
			
		
		//console.log(response_text)
		
		
		// If the API returned an error message beacuse the token count was exceeded.
		// If the "error" key is in the dict that the api returned.
		if ('error' in data) {
			 // Do nothing, i.e. don't append the error message to 
			 // the message_list (chat history).
		
		} else {
			
			var text = "explicit content"
			
			/* Using comparison operators
			if (cleaned_text === text) {
			    cleaned_text = 'Mmm...'
			}
			*/
			
			if (cleaned_text.includes(text)) {
				console.log('Replacing text...')
			    cleaned_text = ''
			} 
			
			// Append to message_list. This is the history of chat messages.
			message_list.push({"role": "assistant", "content": cleaned_text});
			
			
			//console.log('---History---')
			//console.log(message_list)
			
			
			//========================
			// Reduce the message list length
			// to prevent the context length from being exceeded.
			if (message_list.length > max_messages) { //60
				
				console.log("---SUMMARY AGENT---")
				
				// Make two copies of the message history.
				// When sliced the original message_list is always changed.
				var message_list_copy1 = message_list.slice();
				var message_list_copy2 = message_list.slice();
				
				
				// Extract the messages that need to be summarized
				// This will include one or both system messages.
				var messages_to_summ = message_list_copy1.splice(0, num_messages_to_summ);
				
				// Extract the messages that will not get summarized
				var list_length = message_list.length;
				var not_summed_message_history = message_list_copy2.splice(num_messages_to_summ + 1, list_length);
				
				
				var chat_data = {
				    chat_summary: summary,
				    conversation_history: messages_to_summ
				};
			
				// Convert to a json string
				var chat_data_str = JSON.stringify(chat_data);
				
				// Create a message history for input into
				// the summarization agent
				var message_history_for_summ_agent = [{"role": "system", "content": summ_agent_system_message}];	
				
				// Add the data that needs to be summarized
				message_history_for_summ_agent.push({"role": "user", "content": chat_data_str});
				
				
				
				var summ_agent_output = await make_api_call(message_history_for_summ_agent);
				
				console.log("New summary:");
				console.log(summ_agent_output);
				console.log(typeof summ_agent_output);
				
				
				
				if (summ_agent_output != "Error") {
					
					summary = summ_agent_output;
					
					// Convert to json
					//summ_agent_output_json = summ_agent_output.json();
						
					// Get the summary
					//summary = summ_agent_output_json['conversation_summary'];
					
					
				
					// Create a new message history that includes the summary
					let second_system_message_with_summary = `The conversation is ongoing. Older dialogue is being summarized to reduce the LLM context size. This is the summary of the older dialogue:
						Summary: ${summary}`;
						
					message_list = [{"role": "system", "content": system_setup_message}];
					message_list.push({"role": "system", "content": second_system_message_with_summary});
					
					// Create a new message history
					// Concat the lists
					message_list = message_list.concat(not_summed_message_history);
					
					console.log("Final concat list:")
					console.log(message_list)
				
				}
				
			}
			//========================
				
		}
		
		
			
		
		var input_message = {
		  sender: bot_name,
	  		text: paragraph_response
		};
		
		// Delete the div containing the spinner
		delete_spinner_div();
		
		// Add the message from Maiya to the chat
		addMessageToChat(input_message);
		
		
		// Scroll the page up by cicking on a div at the bottom of the page.
		simulateClick('scroll-page-up');
		
		// Put the cursor in the form input field
		const inputField = document.getElementById("user-input");
		inputField.focus();
		
		
		
	  } catch (error) {
		  
		// Delete the div containing the spinner
		delete_spinner_div();
		  
	    console.log(error);
		
		// When this happens print an error message on the screen.
		// The user needs to send the same message again
		if (error.message == 'Failed to fetch') {
			
			var input_message = {
				  	sender: bot_name,
			  		text: 'Failed to fetch. Please send the message again.'
					};
	
		
			// Add the message from Maiya to the chat
			addMessageToChat(input_message);
		
			
		}
		
	  }
	   		
  
  }
  
  