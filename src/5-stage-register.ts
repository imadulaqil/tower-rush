stageRegister = G.exec(() => {

// Creating form
const input: HTMLInputElement = G.c('input', {
    attributes: {
        type: 'text',
        name: 'userId',
        id: 'userId',
        placeholder: 'abc123',
        autocomplete: 'off',
        spellcheck: 'false',
        required: ''
    }
});

const label = G.c('label', {
    attributes: {
        for: input.id
    },
    innerHTML: 'User ID:'
});

const formGroup = G.c('div', {
    children: [label, input],
    classes: ['form-group']
});

const send = G.c('button', {
    attributes: {
        type: 'submit'
    },
    innerHTML: 'Login'
});

const form = G.c('form', {
    children: [formGroup, send]
});

return G.c('div', {
    children: [form],
    classes: ['stage-container'],
    attributes: {
        id: 'stage-register'
    }
});


});

onStageStart(StageType.Register, () => {
    G.show(stageRegister);
});