NbChat: message thread with a status header, primary bubbles for own messages, basic-2 bubbles for others, and a send form.

```jsx
<Chat title="Suporte" status="primary" messages={[{message:'Olá!',sender:'Ana',date:'10:20'},{message:'Oi',reply:true,sender:'Você'}]} onSend={…} />
```

- message: {message, sender, date, reply, avatar, files:[{name,url,icon}], quote}.
