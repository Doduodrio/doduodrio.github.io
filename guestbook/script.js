import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import TimeAgo from "https://cdn.jsdelivr.net/npm/javascript-time-ago@2.6.4/+esm";
import en from "https://cdn.jsdelivr.net/npm/javascript-time-ago@2.6.4/locale/en/+esm";

const supabase = createClient('https://ykglybqamppihprbkhvo.supabase.co', 'sb_publishable_doflIqXwh3MHg7HIxirCAA_7gVGZrM7');
const ta = new TimeAgo('en-US');

console.log(ta.format(new Date(1774536303551)));

const nameBox    = document.getElementById('name-box');
const messageBox = document.getElementById('message-box');
const sendButton = document.getElementById('send-button')
const messages   = document.getElementById('messages')

function appendPost(name, timestamp, message) {
    const newPost = document.createElement('div');
    newPost.className = 'guestbook-post';
    newPost.innerHTML = `
        <time datetime="${new Date(timestamp).toISOString()}">${ta.format(timestamp)}</time>
        <p><strong>From:</strong> ${name}</p>
        <br>
        <p>${message}</p>
    `;
    messages.appendChild(newPost);
}

async function makePost() {
    console.log({name: nameBox.value, created_at: Date.now(), message: messageBox.value});
    // if (nameBox.value && messageBox.value) {
    //     const { error } = await supabase
    //                         .from('guestbook')
    //                         .insert({
    //                             id: 1,
    //                             name: nameBox.value,
    //                             created_at: Date.now(),
    //                             message: messageBox.value
    //                         });
    //     console.log(error);
    // }
}

sendButton.addEventListener('click', makePost);

// const { error } = await supabase.from('guestbook').insert({id: 1, name: 'Doduodrio', created_at: Date.now(), message: 'Hello World'});
// console.log(error);