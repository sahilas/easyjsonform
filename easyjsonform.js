class EasyJsonFormField { 
    constructor(json = null) {
        if (json === null) json = {};
        this.type = json.type || null;
        this.question = json.question || '';
        this.properties = json.properties || null;
    }

    builderEditor(ejf, updateCallback) {
        // Creating editor
        let editor = document.createElement('div');
        Object.assign(editor.style,{
            alignItems: 'center', display: 'grid', gridGap: '0.55rem',
            gridTemplateColumns: 'min-content auto', padding:'1rem', whiteSpace: 'nowrap',
        });
        // Label field
        let lblLabel = document.createElement('label');
        lblLabel.htmlFor = EasyJsonForm.newElementId();
        lblLabel.textContent = EasyJsonForm.dictionary['item.properties.question'];
        let iptLabel = ejf.element('input', 'fieldTextInput')
        iptLabel.id = EasyJsonForm.getElementId();
        iptLabel.type = 'text';
        iptLabel.value = this.question;
        iptLabel.onchange = () => {
            let labelCheckErrors = ejf.labelCheckErrors(iptLabel.value);
            if (labelCheckErrors) {
                alert(labelCheckErrors);
                iptLabel.value = this.question;
            } else {
                this.question = iptLabel.value;
                updateCallback();
            }
        };
        editor.appendChild(lblLabel);
        editor.appendChild(iptLabel);
        return editor;
    }

    helpText() {
        return !this.mandatory ? '' :
            EasyJsonForm.dictionary['common.helptext']
                .replace('{{help-text}}', EasyJsonForm.dictionary['common.helptext.mandatory']);
    }

}

class EasyJsonFormFieldMultipleChoice extends EasyJsonFormField {
    constructor(json = null) {
        super(json);
        if (this.properties === null) this.properties = 
        {
            questionhi: 'Question Hindi',
            items:[1, 2, 3],   // array containing values
            itemshi:[1, 2, 3],   // array containing values
        };
        this.type = 'multiplechoice';
    }

    builderEditor(ejf, updateCallback) {
        let editor = super.builderEditor(ejf, updateCallback);
        // QuestionHi field
        let lblQuestionHi = document.createElement('label');
        lblQuestionHi.htmlFor = EasyJsonForm.newElementId();
        lblQuestionHi.textContent = EasyJsonForm.dictionary['item.range.properties.question.hi'];
        let iptQuestionHi = ejf.element('input', 'fieldTextInput')
        iptQuestionHi.type = 'text';
        iptQuestionHi.id = EasyJsonForm.getElementId();
        iptQuestionHi.value = this.properties.questionhi;
        iptQuestionHi.onchange = () => {this.properties.questionhi = iptQuestionHi.value; updateCallback();};
        editor.appendChild(lblQuestionHi);
        editor.appendChild(iptQuestionHi);
        // Items field
        let lblItems = document.createElement('label');
        lblItems.htmlFor = EasyJsonForm.newElementId();
        lblItems.innerHTML = `${EasyJsonForm.dictionary['item.properties.items']}
        <br/><small>${EasyJsonForm.dictionary['item.properties.items.help']}</small>`;
        let txaItems = ejf.element('textarea', 'fieldTextAreaInput')
        txaItems.id = EasyJsonForm.getElementId();
        txaItems.value = this.properties.items.join('\n');
        txaItems.onchange = () => {this.properties.items = txaItems.value.split('\n');
        };
        editor.appendChild(lblItems);
        editor.appendChild(txaItems);
        // Itemshi field
        let lblItemshi = document.createElement('label');
        lblItemshi.htmlFor = EasyJsonForm.newElementId();
        lblItemshi.innerHTML = `${EasyJsonForm.dictionary['item.properties.itemshi']}
        <br/><small>${EasyJsonForm.dictionary['item.properties.itemshi.help']}</small>`;
        let txaItemshi = ejf.element('textarea', 'fieldTextAreaInput')
        txaItemshi.id = EasyJsonForm.getElementId();
        txaItemshi.value = this.properties.itemshi.join('\n');
        txaItemshi.onchange = () => {this.properties.itemshi = txaItemshi.value.split('\n'); updateCallback();};
        editor.appendChild(lblItemshi);
        editor.appendChild(txaItemshi);
        return editor;
    }

    formFieldCreate(ejf, position, withValidation = false) {
        let validationError = (withValidation && this.validate().length > 0);
        let lblFormField = ejf.element('label', 'FieldMultiplechoiceLabel', validationError ? 'ValidationErrorLabel' : null);
        lblFormField.innerHTML = `${this.question}${this.helpText()}`;
        let formGroup = ejf.element('span', 'FieldMultiplechoiceGroup');
        this.properties.items.forEach((element, index) => {
            let lblCheck = ejf.element('label', 'FieldMultiplechoiceItemLabel');
            lblCheck.htmlFor = `${ejf.id}[${position}][${index}]`;
            lblCheck.textContent = element;
            let item = ejf.element('span', 'FieldMultiplechoiceItem');
            item.appendChild(lblCheck);
            if (validationError) item.appendChild(this.validationErrorMessage(ejf));
            formGroup.appendChild(item);
        });
        let formField = ejf.element('div', 'FieldMultiplechoice');
        formField.appendChild(lblFormField);
        return formField;
    }

}

class EasyJsonFormFieldRating extends EasyJsonFormField {
    constructor(json = null) {
        super(json);
        if (this.properties === null) this.properties = 
        {
            questionhi: 'Question Hindi',
        };
        this.type = 'rating';
    }

    builderEditor(ejf, updateCallback) {
        let editor = super.builderEditor(ejf, updateCallback);
        // QuestionHi field
        let lblQuestionHi = document.createElement('label');
        lblQuestionHi.htmlFor = EasyJsonForm.newElementId();
        lblQuestionHi.textContent = EasyJsonForm.dictionary['item.range.properties.question.hi'];
        let iptQuestionHi = ejf.element('input', 'fieldTextInput')
        iptQuestionHi.type = 'text';
        iptQuestionHi.id = EasyJsonForm.getElementId();
        iptQuestionHi.value = this.properties.questionhi;
        iptQuestionHi.onchange = () => {this.properties.questionhi = iptQuestionHi.value; updateCallback();};
        editor.appendChild(lblQuestionHi);
        editor.appendChild(iptQuestionHi);
        return editor;
    }
    formFieldCreate(ejf, position, withValidation = false) {
        let lblFormField = ejf.element('label', 'FieldNumberLabel');
        lblFormField.htmlFor = `${ejf.id}[${position}]`;
        lblFormField.innerHTML = `${this.question}${this.helpText()}`;
        let formField = ejf.element('div', 'FieldNumber');
        formField.appendChild(lblFormField);
        return formField;
    }

}

class EasyJsonFormFieldLikert extends EasyJsonFormField {
    constructor(json = null) {
        super(json);
        if (this.properties === null) this.properties = 
        {
            questionhi: 'Question Hindi',
        };
        this.type = 'rating';
    }

    builderEditor(ejf, updateCallback) {
        let editor = super.builderEditor(ejf, updateCallback);
        // QuestionHi field
        let lblQuestionHi = document.createElement('label');
        lblQuestionHi.htmlFor = EasyJsonForm.newElementId();
        lblQuestionHi.textContent = EasyJsonForm.dictionary['item.range.properties.question.hi'];
        let iptQuestionHi = ejf.element('input', 'fieldTextInput')
        iptQuestionHi.type = 'text';
        iptQuestionHi.id = EasyJsonForm.getElementId();
        iptQuestionHi.value = this.properties.questionhi;
        iptQuestionHi.onchange = () => {this.properties.questionhi = iptQuestionHi.value; updateCallback();};
        editor.appendChild(lblQuestionHi);
        editor.appendChild(iptQuestionHi);
        return editor;
    }
    formFieldCreate(ejf, position, withValidation = false) {
        let lblFormField = ejf.element('label', 'FieldNumberLabel');
        lblFormField.htmlFor = `${ejf.id}[${position}]`;
        lblFormField.innerHTML = `${this.question}${this.helpText()}`;
        let formField = ejf.element('div', 'FieldNumber');
        formField.appendChild(lblFormField);
        return formField;
    }

}

class EasyJsonFormFieldSingleChoice extends EasyJsonFormField {
    constructor(json = null) {
        super(json);
        if (this.properties === null) this.properties = 
        {
            questionhi: 'Question Hindi',
            items:[1, 2, 3],   // array containing values
            itemshi:[1, 2, 3],   // array containing values

        };
        this.type = 'singlechoice';
    }

    builderEditor(ejf, updateCallback) {
        let editor = super.builderEditor(ejf, updateCallback);
        // QuestionHi field
        let lblQuestionHi = document.createElement('label');
        lblQuestionHi.htmlFor = EasyJsonForm.newElementId();
        lblQuestionHi.textContent = EasyJsonForm.dictionary['item.range.properties.question.hi'];
        let iptQuestionHi = ejf.element('input', 'fieldTextInput')
        iptQuestionHi.type = 'text';
        iptQuestionHi.id = EasyJsonForm.getElementId();
        iptQuestionHi.value = this.properties.questionhi;
        iptQuestionHi.onchange = () => {this.properties.questionhi = iptQuestionHi.value; updateCallback();};
        editor.appendChild(lblQuestionHi);
        editor.appendChild(iptQuestionHi);
        // Items field
        let lblItems = document.createElement('label');
        lblItems.htmlFor = EasyJsonForm.newElementId();
        lblItems.innerHTML = `${EasyJsonForm.dictionary['item.properties.items']}
        <br/><small>${EasyJsonForm.dictionary['item.properties.items.help']}</small>`;
        let txaItems = ejf.element('textarea', 'fieldTextAreaInput')
        txaItems.id = EasyJsonForm.getElementId();
        txaItems.value = this.properties.items.join('\n');
        txaItems.onchange = () => {this.properties.items = txaItems.value.split('\n'); updateCallback();};
        editor.appendChild(lblItems);
        editor.appendChild(txaItems);
        // Itemshi field
        let lblItemshi = document.createElement('label');
        lblItemshi.htmlFor = EasyJsonForm.newElementId();
        lblItemshi.innerHTML = `${EasyJsonForm.dictionary['item.properties.itemshi']}
        <br/><small>${EasyJsonForm.dictionary['item.properties.itemshi.help']}</small>`;
        let txaItemshi = ejf.element('textarea', 'fieldTextAreaInput')
        txaItemshi.id = EasyJsonForm.getElementId();
        txaItemshi.value = this.properties.itemshi.join('\n');
        txaItemshi.onchange = () => {this.properties.itemshi = txaItemshi.value.split('\n'); updateCallback();};
        editor.appendChild(lblItemshi);
        editor.appendChild(txaItemshi);
        return editor;
    }

    formFieldCreate(ejf, position, withValidation = false) {
        let validationError = (withValidation && this.validate().length > 0);
        let lblFormField = ejf.element('label', 'FieldSinglechoiceLabel', validationError ? 'ValidationErrorLabel' : null);
        lblFormField.htmlFor = `${ejf.id}[${position}]`;
        lblFormField.innerHTML = `${this.question}${this.helpText()}`;
        let formField = ejf.element('div', 'FieldSinglechoice');
        formField.appendChild(lblFormField);
        if (validationError) formField.appendChild(this.validationErrorMessage(ejf));
        return formField;
    }
 
}

class EasyJsonFormFieldText extends EasyJsonFormField {
    constructor(json = null) {
        super(json);
        // if (this.value === null) this.value = '';
        if (this.properties === null) this.properties = {
            questionhi: 'Question Hindi',
            lengthmax: 0,
            lengthmin: 0, 
            // multiline: false,
        };
        this.type = 'range';
    }

    builderEditor(ejf, updateCallback) {
        let editor = super.builderEditor(ejf, updateCallback);
        // QuestionHi field
        let lblQuestionHi = document.createElement('label');
        lblQuestionHi.htmlFor = EasyJsonForm.newElementId();
        lblQuestionHi.textContent = EasyJsonForm.dictionary['item.range.properties.question.hi'];
        let iptQuestionHi = ejf.element('input', 'fieldTextInput')
        iptQuestionHi.type = 'text';
        iptQuestionHi.id = EasyJsonForm.getElementId();
        iptQuestionHi.value = this.properties.questionhi;
        iptQuestionHi.onchange = () => {this.properties.questionhi = iptQuestionHi.value; updateCallback();};
        editor.appendChild(lblQuestionHi);
        editor.appendChild(iptQuestionHi);
        // Length min field
        let lblLengthMin = document.createElement('label');
        lblLengthMin.htmlFor = EasyJsonForm.newElementId();
        lblLengthMin.textContent = EasyJsonForm.dictionary['item.range.properties.length.min'];
        let iptLengthMin = ejf.element('input', 'fieldTextInput')
        iptLengthMin.type = 'number';
        iptLengthMin.min = 0;
        iptLengthMin.step = 1;
        iptLengthMin.id = EasyJsonForm.getElementId();
        iptLengthMin.value = this.properties.lengthmin;
        iptLengthMin.onchange = () => {this.properties.lengthmin = iptLengthMin.value; updateCallback();};
        editor.appendChild(lblLengthMin);
        editor.appendChild(iptLengthMin);
        // Length max field
        let lblLengthMax = document.createElement('label');
        lblLengthMax.htmlFor = EasyJsonForm.newElementId();
        lblLengthMax.textContent = EasyJsonForm.dictionary['item.range.properties.length.max'];
        let iptLengthMax = ejf.element('input', 'fieldTextInput')
        iptLengthMax.type = 'number';
        iptLengthMax.min = 0;
        iptLengthMax.step = 1;
        iptLengthMax.id = EasyJsonForm.getElementId();
        iptLengthMax.value = this.properties.lengthmax;
        iptLengthMax.onchange = () => {this.properties.lengthmax = iptLengthMax.value; updateCallback();};
        editor.appendChild(lblLengthMax);
        editor.appendChild(iptLengthMax);
        return editor;
    }

    formFieldCreate(ejf, position, withValidation = false) {
        let validationError = (withValidation && this.validate().length > 0);
        let lblFormField = ejf.element('label', 'FieldTextLabel', validationError ? 'ValidationErrorLabel' : null);
        lblFormField.htmlFor = `${ejf.id}[${position}]`;
        lblFormField.innerHTML = `${this.question}${this.helpText()}`;
        let formField = ejf.element('div', 'FieldText');
        formField.appendChild(lblFormField);
        return formField;
    }

    helpText() {
        let restrictions = [];
        if (this.mandatory) restrictions.push(EasyJsonForm.dictionary['common.helptext.mandatory']);
        if (this.properties.lengthmeasurement == 'byword') {
            if(this.properties.lengthmin > 0)
                restrictions.push(EasyJsonForm.dictionary['common.helptext.min.length.by.word'].replace('{{min}}', this.properties.lengthmin));
            if(this.properties.lengthmax > 0)
                restrictions.push(EasyJsonForm.dictionary['common.helptext.max.length.by.word'].replace('{{max}}', this.properties.lengthmax));
        }
        else if (this.properties.lengthmeasurement == 'bycharacter') {
            if(this.properties.lengthmin > 0)
                restrictions.push(EasyJsonForm.dictionary['common.helptext.min.length.by.character'].replace('{{min}}', this.properties.lengthmin));
            if(this.properties.lengthmax > 0)
                restrictions.push(EasyJsonForm.dictionary['common.helptext.max.length.by.character'].replace('{{max}}', this.properties.lengthmax));
        }
        return (restrictions.length == 0) ? 
            '' :
            EasyJsonForm.dictionary['common.helptext'].replace('{{help-text}}',
            restrictions.join(EasyJsonForm.dictionary['common.helptext.separator']));
    }

}

class EasyJsonForm {
    constructor(id, structure = null, style = null, options = null) {
        if (id) this.id = id;
        else throw new Error('Id is mandatory');
        this.structureImport(structure || []);
        this.style = style || {};
        this.options = options || {};
    }

    /**
     * Creates the EasyJsonForm Builder element to be added in the page.
     */
    builderGet() {
        if (!this.builder) {
            // Creating builder element
            this.builder = this.element('div', 'Builder');

            // Creating toolbar
            this.builderToolbar = this.element('div', 'BuilderToolbar');

            // Inserting add buttons to the toolbar 
            for (const [type, classs] of Object.entries(EasyJsonForm.registeredClasses)) {
                let button = this.element('button', 'BuilderToolbarButton');
                button.disabled = this.options.disabled || false;
                button.type = 'button';
                button.innerHTML = EasyJsonForm.iconAdd + EasyJsonForm.dictionary[`item.${type}`];
                button.onclick = () => {
                    let fieldName = EasyJsonForm.dictionary[`common.question.new`]
                        .replace('{{field-type}}', EasyJsonForm.dictionary[`item.${type}`]);
                    this.structure.push(new classs({question: this.labelFind(fieldName),questionhi: this.labelFind(fieldName)}));
                    this.builderUpdate();
                    if (this.options.onStructureChange) this.options.onStructureChange();
                };
                this.builderToolbar.appendChild(button);
            }

            // Creating table
            let builderTable = this.element('table', 'BuilderTable');
            builderTable.appendChild(document.createElement('tbody'));
            this.builder.appendChild(builderTable);
            this.builderUpdate();
        }
        return this.builder;
    }

    builderMoveItem(position, offset) {
        if (position+offset >= this.structure.length || position+offset < 0) return;
        let currentItem = this.structure[position];
        let movedItem = this.structure[position+offset];
        this.structure[position+offset] = currentItem;
        this.structure[position] = movedItem;
        this.builderUpdate();
        if (this.options.onStructureChange) this.options.onStructureChange();
    }

    builderUpdate() {
        let tbody = this.builder.children[0].children[0];
        while (tbody.rows.length > 0) tbody.deleteRow(-1);
        this.structure.forEach((element, i) => {
            let tr = tbody.insertRow(-1);

            let mainTd = tr.insertCell(-1);
            mainTd.appendChild(element.formFieldCreate(this, i));
            mainTd.style.width = '90%';

            let toolbarTd = tr.insertCell(-1);
            let toolbar = this.element('div', 'BuilderFieldTooldbar');
            toolbarTd.appendChild(toolbar);

            let btnEdit = this.element('button', 'BuilderFieldTooldbarButton');
            btnEdit.disabled = this.options.disabled || false;
            btnEdit.type = 'button';
            btnEdit.innerHTML = EasyJsonForm.iconEdit;
            toolbar.appendChild(btnEdit);

            let btnEditFinish = this.element('button', 'BuilderFieldTooldbarButton');
            btnEditFinish.disabled = this.options.disabled || false;
            btnEditFinish.type = 'button';
            btnEditFinish.style.display = 'none';
            btnEditFinish.innerHTML = EasyJsonForm.iconOK;
            toolbar.appendChild(btnEditFinish);

            let btnMoveUp = this.element('button', 'BuilderFieldTooldbarButton');
            btnMoveUp.disabled = this.options.disabled || false;
            btnMoveUp.type = 'button';
            btnMoveUp.innerHTML = EasyJsonForm.iconUp;
            toolbar.appendChild(btnMoveUp);

            let btnMoveDown = this.element('button', 'BuilderFieldTooldbarButton');
            btnMoveDown.disabled = this.options.disabled || false;
            btnMoveDown.type = 'button';
            btnMoveDown.innerHTML = EasyJsonForm.iconDown;
            toolbar.appendChild(btnMoveDown);
            
            let btnDelete = this.element('button', 'BuilderFieldTooldbarDeleteButton');
            btnDelete.disabled = this.options.disabled || false;
            btnDelete.type = 'button';
            btnDelete.innerHTML = EasyJsonForm.iconDelete;
            toolbar.appendChild(btnDelete);

            btnEdit.onclick = () => {
                let editor = this.structure[i].builderEditor(this, () => {
                    mainTd.replaceChild(this.structure[i].formFieldCreate(this, i), mainTd.children[0]);
                    if (this.options.onStructureChange) this.options.onStructureChange();
                });
                mainTd.appendChild(editor);
                btnEdit.style.display = 'none';
                btnEditFinish.style.display = 'inline-block';
            };
            btnEditFinish.onclick = () => {
                mainTd.removeChild(mainTd.lastChild);
                btnEdit.style.display = 'inline-block';
                btnEditFinish.style.display = 'none';
            };
            btnMoveUp.onclick = () => this.builderMoveItem(i, -1);
            btnMoveDown.onclick = () => this.builderMoveItem(i, +1);
            btnDelete.onclick = () => {
                if(confirm(EasyJsonForm.dictionary['builder.message.delete'].replace('{{position}}', i+1)))
                {
                    this.structure.splice(i, 1);
                    this.builderUpdate();
                    if (this.options.onStructureChange) this.options.onStructureChange();
                }
            };
        });
        let lastRow = tbody.insertRow(-1).insertCell(-1);
        lastRow.colSpan = 2;
        lastRow.appendChild(this.builderToolbar);
    }

    labelFind(label) {
        let i = 1;
        let found = false;
        while (!found) {
            let labelCandidate = label.replace('{{field-number}}', i);
            found = true;
            for (const formField of this.structure) {
                if (formField.question == labelCandidate) {
                    i++; found = false;
                }
            }
        }
        return label.replace('{{field-number}}', i);
    }

    labelCheckErrors(labelCandidate) {
        // Labels cannot be numbers
        const reg = new RegExp('^[0-9]+$');
        if (reg.test(labelCandidate))
            return EasyJsonForm.dictionary['builder.message.question.name.cannot.be.numeric'];
        // Labels cannot repeat themselves
        for (const formField of this.structure) {
            if (formField.question == labelCandidate) {
                return EasyJsonForm.dictionary['builder.message.question.name.already.in.use'];
            }
        return false;
        }
    }

    structureExport() {
        return(JSON.parse(JSON.stringify(this.structure)));
    }

    structureImport(structure) {
        this.structure = [];
        structure.forEach(element => {
            let classs = EasyJsonForm.registeredClasses[element.type];
            if (classs) this.structure.push(new classs(element));
        });
        if (this.builder) this.builderUpdate();
        if (this.onStructureChange) this.onStructureChange();
    }

    // Internal methods and properties. Don't need to be called externally.
    static newElementId = () => `ejf-${++EasyJsonForm.elementId}`;
    static getElementId = () => `ejf-${EasyJsonForm.elementId}`;
    static elementId = 0;
    element(htmlTagName, styleName = null, validationStyleName = null) {
        let element = document.createElement(htmlTagName);
        if (styleName && this.style[styleName]) {
            if (this.style[styleName].classList)
                this.style[styleName].classList.forEach(x =>element.classList.add(x));
            if (this.style[styleName].style)
                for (const [key, value] of Object.entries(this.style[styleName].style))
                    element.style[`${key}`] = value;
        }
        if (styleName) element.classList.add(`ejf${styleName}`);
        if (validationStyleName && this.style[validationStyleName]) {
            if (this.style[validationStyleName].classList)
                this.style[validationStyleName].classList.forEach(x =>element.classList.add(x));
            if (this.style[validationStyleName].style)
                for (const [key, value] of Object.entries(this.style[validationStyleName].style))
                    element.style[`${key}`] = value;
        }
        if (validationStyleName) element.classList.add(`ejf${validationStyleName}`);
        element.required = true;
        return element;
    }

    // Resources. Can be modified for extra customization of the library.
    static registeredClasses = {
        'singlechoice': EasyJsonFormFieldSingleChoice,
        'multiplechoice': EasyJsonFormFieldMultipleChoice,
        'range': EasyJsonFormFieldText,
        'rating': EasyJsonFormFieldRating,
        'likert': EasyJsonFormFieldLikert,
    };
    static supportedFileTypes = {
        'application/pdf' : {extensions:['pdf']},
        'image/gif' : {extensions:['gif']},
        'image/png' : {extensions:['png']},
        'image/jpeg': {extensions:['jpeg','jpg','jpe']},
        'image/bmp': {extensions:['bmp']},
        'application/msword': {extensions:['doc']},
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {extensions:['docx']},
        'application/vnd.ms-excel': {extensions:['xls']},
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {extensions:['xlsx']},
        'application/vnd.ms-powerpoint': {extensions:['ppt']},
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': {extensions:['pptx']},
    }
    static iconAdd = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/></svg>';
    static iconDelete = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser" viewBox="0 0 16 16"><path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/></svg>';
    static iconDown = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/></svg>';
    static iconEdit = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>';
    static iconOK = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>';
    static iconUp = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg>';
    static dictionary = {
        "builder.message.delete": "Are you sure you want to delete item at position {{position}}?",
        "builder.message.question.name.already.in.use": "This label is already in use. Please choose another one.",
        "builder.message.question.name.cannot.be.numeric": "Label cannot contain only numbers.",
        "common.export.compound.field": "{{1st-level-label}} - {{2nd-lebel-label}}",
        "common.helptext": " <small>({{help-text}})</small>",
        "common.helptext.min.length.by.character": "min. characters: {{min}}",
        "common.helptext.max.length.by.character": "max. characters: {{max}}",
        "common.helptext.min.length.by.word": "min. words: {{min}}",
        "common.helptext.max.length.by.word": "max. words: {{max}}",
        "common.helptext.mandatory": "mandatory",
        "common.helptext.separator": ", ",
        "common.question.new": "New {{field-type}} {{field-number}}",
        "common.value.no": "No",
        "common.value.yes": "Yes",
        "item.textgroup": "Text group",
        "item.multiplechoice": "Multiple choice",
        "item.singlechoice": "Single choice",
        "item.singlechoice.value.null": ">> Select",
        "item.properties.question": "Question English",
        "item.properties.items": "Items English",
        "item.properties.items.help": "One per line, Max 8",
        "item.properties.itemshi": "Items Hindi",
        "item.properties.itemshi.help": "One per line, Max 8",
        "item.properties.mandatory": "Mandatory",
        "item.rating": "Rating",
        "item.likert": "Likert",
        "item.range": "Range",
        "item.range.character.count": "{{chars}} characters",
        "item.range.properties.length.max": "Maximum length",
        "item.range.properties.length.measure.bycharacter": "By character",
        "item.range.properties.length.measure.byword": "By word",
        "item.range.properties.length.measure.no": "No",
        "item.range.properties.question.hi": "Question Hindi",
        "item.range.properties.length.min": "Minimum length",
        "item.range.word.count": "{{words}} words",
    };
    // Do not leave a trailing comma on the last dictionary element. This can produce errors on external services
}
