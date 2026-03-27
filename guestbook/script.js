import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import TimeAgo from "https://cdn.jsdelivr.net/npm/javascript-time-ago@2.6.4/+esm";
import en from "https://cdn.jsdelivr.net/npm/javascript-time-ago@2.6.4/locale/en/+esm";

const supabase = createClient('https://ykglybqamppihprbkhvo.supabase.co', 'sb_publishable_doflIqXwh3MHg7HIxirCAA_7gVGZrM7');
const ta = new TimeAgo('en-US');

console.log(ta.format(new Date(1774536303551)));

const inputBox      = document.getElementById('input-box');
const nameBox       = document.getElementById('name-box');
const messageBox    = document.getElementById('message-box');
const sendButton    = document.getElementById('send-button')
const refreshButton = document.getElementById('refresh-button');
const messages      = document.getElementById('messages')

function prependMessage(name, created_at, message) {
    const date = new Date(created_at);

    const messageContent = document.createElement('p');
    messageContent.innerText = message;

    const newMessage = document.createElement('div');
    newMessage.className = 'guestbook-message';
    newMessage.innerHTML = `
        <div class="header">
            <p>From: ${name}</p>
            <time datetime="${date.toISOString()}" title="${date.toLocaleString()}">${ta.format(created_at)}</time>
        </div>
        <div class="body">
            ${messageContent.outerHTML}
        </div>
    `;
    messages.prepend(newMessage);
}

async function submitMessage() {
    let name = nameBox.value?.trim();
    let message = messageBox.value?.trim();

    if (name?.length > 0 && message?.length > 0) {
        // send data to supabase
        const date = Date.now();
        const {error} = await supabase.from('guestbook').insert({
            name: name,
            created_at: date,
            message: message
        });

        // handle error
        if (error) {
            console.log('submitMessage:', error);

            // display error message
            const error_message = document.createElement('div');
            error_message.innerHTML = `
                <br>
                <p><strong>ERROR:</strong> Couldn't submit message.</p>
            `;
            inputBox.appendChild(error_message);
            setTimeout(() => error_message.remove(), 3000);
        }
        else {
            console.log('Submitted message');
            console.log({name: name, created_at: date, message: message});

            // refresh messages
            loadMessages();

            // clear name and message boxes
            nameBox.value = '';
            messageBox.value = '';
        }
    }
    else {
        console.log('Couldn\'t submit message: one or more fields empty.');
    }
}

async function loadMessages() {
    // clear existing messages
    messages.innerHTML = '';

    const loading = document.createElement('p');
    loading.innerText = 'Loading messages...';2
    messages.appendChild(loading);

    // get data from supabase
    const {data, error} = await supabase.from('guestbook').select();

    loading.remove();
    if (error) {
        console.log('loadMessages:', error);

        // display error message
        const errorMessage = document.createElement('div');
        errorMessage.innerHTML = `
            <p><strong>ERROR:</strong> Couldn't load messages.</p>
        `;
        messages.appendChild(errorMessage);
    }
    else {
        console.log('Retrieved data');
        for (let i=0; i<data.length; i++) {
            if (!data[i].hidden) {prependMessage(data[i].name, data[i].created_at, data[i].message);}
        }
        console.log('Loaded messages');
    }
}

sendButton.addEventListener('click', submitMessage);
refreshButton.addEventListener('click', loadMessages);
loadMessages();