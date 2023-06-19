import { Component, ElementRef, ViewChild, AfterViewInit, OnInit  } from '@angular/core';
import {TimeServiceService} from './time-service.service';
import axios from 'axios';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})


export class AppComponent implements OnInit{
  @ViewChild("input")
  currentInput!: ElementRef;

  title = 'entwicklungsapp';
  //singleselect answers
  answersingle: string | null = null;
  answerssingle:  { id: string, value: string, question:string, }[] = [];
  //multiselect answers
  answermulti: string | null = null;
  answersmulti: { id: string, value: string, question:string, }[] = [];
  answersmultivalue:string[]=[];
  //textinput
  answertext:string | null = null;
  answerstext: { id: string, value: string, question:string, }[] = [];
  //multipleupload
  multipleUpload:  { inProgress: boolean, file: File, editable:boolean, }[] = [];
  multipleUploadPromises = [];
  // Geburtsdatum
  date: { id: string, value: string, question:string, age:number}[] = [];
  geburtsdatum:any ='';
  alter:number | null = null;
  answerdate: string | null = null;
  answersdate: { id: string, value: string, question:string, age:number}[] = [];
  answersdatevalue:string[]=[];
  // single upload document
  uploadeddata: string []=[];
  selectvalue:string | null = null;
  allselected:string[]=[];
  allselectederwachsen:string[]=[];
  inputvaluemulti:string = '';
  selectedOptions: string[]=[];
  newdata: any;
  // testdata: any;
  clicked:boolean = false;
  status = 2;
  massnahmen ='';
  geschlecht='';
 
  
  person='';
  output = '';
  // testname:any;
  
  elementerwachsen: any;
  elementkind='';
  nummer:any;
  elementidkind:any;
  elementiderwachsen:any;

  showelement: boolean=false;
  // optionserwachsen: string[] = ['Impfung','Krebsvorsorge','Zahnvorsorge','Vorsorge-Schwangere','Zahnvorsorge','Checkup35','Private','Zusatzversicherung','Praevention','BMI','Sport','Nichtraucher','Betrieblich'];
  // optionskind: string[] = ['Impfung','Untersuchung','Zahnvorsorge','Private','Zusatzversicherung','Praevention','Sport','Babyschwimmen'];

  condition:{type:string,questionid:number,questionactivate:string,optionactivate:string, value:string,variable:string}[]=[
    {type:'question',questionid:4 , questionactivate: 'Maßnahmen',optionactivate:'', value:'.age > 16', variable:'answersdate'},
    {type:'question',questionid:5 , questionactivate: 'Maßnahmen-kind',optionactivate:'', value:'.age < 16', variable:'answersdate'},
    {type:'question',questionid:1 , questionactivate: 'Kind',optionactivate:'', value:'.value.includes("Für mein kind")', variable:'answerssingle'},
    {type:'option',questionid:5 , questionactivate: '',optionactivate:'Impfung', value:'.value.includes("test1")', variable:'answerssingle'},
    {type:'question',questionid:2 , questionactivate: 'Geschlecht',optionactivate:'', value:'.value.includes("Impfung")', variable:'answersmulti'},
  ];
  question: {questionid:number, name:string, info:string, type: string, options:string, pflicht:string, minage:number,visible:string;validation:string;regex:string;placeholder:string;condition:string}[]=[
    {questionid: 0,name: 'Person',info: 'Für wen ist der Antrag?', type: 'boolean',options:'j', pflicht:'j', minage: 0, visible:'yes',validation:'n',regex:'',placeholder:'',condition:'no'},
    {questionid: 1,name: 'Kind',info: 'Bitte hier den Namen des Kindes eintragen.', type: 'text',options:'n', pflicht:'j', minage: 0, visible:'no',validation:'n',regex:'',placeholder:'Nachname, Vorname',condition:'yes'},
    {questionid: 2,name: 'Geschlecht',info:'Bitte wählen Sie Ihr Geschlecht aus:', type:'boolean', options:'j', pflicht:'j', minage: 0, visible:'no',validation:'n',regex:'',placeholder:'',condition:'yes'},
    {questionid: 3,name: 'Geburtsdatum',info:'Bitte geben Sie hier Ihr Geburtsdatum ein:', type:'date', options:'n', pflicht:'j', minage: 0, visible:'no',validation:'n',regex:'',placeholder:'',condition:'yes'},
    {questionid: 4,name: 'Maßnahmen',info:'Bitte wählen Sie Ihre Maßnahmen aus:', type:'select', options:'j', pflicht:'j', minage: 16, visible:'no',validation:'n',regex:'',placeholder:'',condition:'yes'},
    {questionid: 5,name: 'Maßnahmen-kind',info:'Bitte geben Sie hier Ihr test ein:', type:'select', options:'j', pflicht:'j', minage: 0, visible:'no',validation:'j',regex:'',placeholder:'',condition:'yes'}
  ];

  questionoption: {name:string, pflicht:string, prio:number, questionid:number, visible:string}[]=[
    {name: 'Für mich', pflicht:'j', prio: 1, questionid:0, visible: 'yes'},
    {name: 'Für mein kind', pflicht:'j', prio: 2, questionid: 0, visible: 'yes'},
    {name: 'test1', pflicht:'j', prio:1,questionid:1, visible: 'yes'},
    {name: 'test2', pflicht:'j', prio:1,questionid:1, visible: 'yes'},
    {name: 'test2', pflicht:'j', prio:1,questionid:6, visible: 'yes'},
    {name: 'test3', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'test4', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'test5', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'test6', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'Impfung', pflicht:'j', prio:1,questionid:4, visible: 'yes'},
    {name: 'Impfung', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'Krebsvorsorge', pflicht:'j', prio:1,questionid:4, visible: 'yes'},
    {name: 'Krebsvorsorge', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'Vorsorge-Schwangere', pflicht:'j', prio:1,questionid:4, visible: 'yes'},
    {name: 'Vorsorge-Schwangere', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'Zahnvorsorge', pflicht:'j', prio:1,questionid:4, visible: 'yes'},
    {name: 'Zahnvorsorge', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'Checkup35', pflicht:'j', prio:1,questionid:4, visible: 'yes'},
    {name: 'Checkup35', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'Private-Vorsorge', pflicht:'j', prio:1,questionid:4, visible: 'yes'},
    {name: 'Private-Vorsorge', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'Zusatzversicherung', pflicht:'j', prio:1,questionid:4, visible: 'yes'},
    {name: 'Zusatzversicherung', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'Prävention', pflicht:'j', prio:1,questionid:4, visible: 'yes'},
    {name: 'Prävention', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'BMI', pflicht:'j', prio:1,questionid:4, visible: 'yes'},
    {name: 'BMI', pflicht:'j', prio:1,questionid:5, visible: 'yes'},
    {name: 'Nichtraucher', pflicht:'j', prio:1,questionid:4, visible: 'yes'},
    {name: 'Nichtraucher', pflicht:'j', prio:5,questionid:4, visible: 'yes'},
    {name: 'Betriebliche-Gesundheitsförderung', pflicht:'j', prio:1,questionid:4, visible: 'yes'},
  ];

  bonus: {name:string, type:string,}[]=[
    {name:'Impfung',type:'erwachsen'},
    {name:'Krebsvorsorge',type:'erwachsen'},
    {name:'Vorsorge-Schwangere',type:'erwachsen'},
    {name:'Zahnvorsorge',type:'erwachsen'},
    {name:'Checkup35',type:'erwachsen'},
    {name:'Private-Vorsorge',type:'erwachsen'},
    {name:'Zusatzversicherung',type:'erwachsen'},
    {name:'Prävention',type:'erwachsen'},
    {name:'BMI',type:'erwachsen'},
    {name:'Nichtraucher',type:'erwachsen'},
    {name:'Betriebliche-Gesundheitsförderung',type:'erwachsen'},
    {name:'Impfung',type:'kind'},
    {name:'Zahnvorsorge',type:'kind'},
    {name:'u-/J-Untersuchungen',type:'kind'},
    {name:'Private Vorsorge',type:'kind'},
    {name:'Zusatzversicherung',type:'kind'},
    {name:'Prävention',type:'kind'},
    {name:'Sportaktivitäten',type:'kind'},
    {name:'Babyschwimmen',type:'kind'},
  ];

  length:number = this.question.length;
  constructor(private time:TimeServiceService)
  {
    this.time.getData().subscribe(data=>{
      this.newdata=data;
    })
  }

  ngOnInit(): void {
    this.questionInit();
    for (let i = 0; i < this.question.length; i++) {
  }
}

  render(element: HTMLElement, container: HTMLElement) {
    container.innerHTML = element.outerHTML;
  }
  
  getcondition(){
return this.condition
  }
  
  

  async questionInit() {
          sessionStorage.clear();
          for (let i = 0; i < this.question.length; i++) {
            if (this.question[i].type === 'boolean') {
              const myElement = document.createElement('div');
              const myContainer = document.getElementById('test');
        
              if (myContainer) {
                myContainer.appendChild(myElement);
              }
        
              myElement.classList.add('selectSingle'+ i);
              myElement.textContent = 'Hello, World!';
              myElement.innerHTML = `
              <div id="boolean${i}">
              <label>${this.question[i].info}</label>
                <div id="wrapper">
                  <form>
                    <div class="input-wrapper">
                      <div class="inputField">
                        <input id="input-single-${i}" autocomplete="off" type="button" class="dropdown-button wide"/>
                        <div style="display:none;" class="overlay"></div>
                        <div id="singleItem-${i}" class="dropdown-content" style="display:none;">
                          ${this.questionoption
                            .filter((option) => option.questionid === this.question[i].questionid)
                            .map((option, index) => `<p class="select-option" id="boolean-option-${i}-${index}">${option.name}</p>`)
                            .join('')}
                        </div>
                      </div>
                      <span class="inputType"><i class="fa fa-chevron-down input-icon"></i></span>
                    </div>
                    <p class="mat-hint-is-p"></p>
                  </form>
                </div><br/>
                </div>
              `;
        
              this.render(myElement, myElement);}


        if (this.question[i].type === 'select') {
          const myElement = document.createElement('div');
          const myContainer = document.getElementById('test');
    
          if (myContainer) {
            myContainer.appendChild(myElement);
          }
    
          myElement.classList.add('selectMultiple'+ i);
          myElement.textContent = 'Hello, World!';
          myElement.innerHTML = `
          <div id="select${i}" style="display:${this.question[i].visible === 'no' ? 'none' : 'block'}">
          <label>${this.question[i].info}</label>
          <div id="wrapper" >
            <form>
              <div class="input-wrapper">
                <div class="inputField">
                  <input id="input-multiple-${i}" autocomplete="off" type="button" class="dropdown-button wide"/>
                  <div style="display:none;" class="overlay"></div>
                  <div id="multipleItem-${i}" class="dropdown-content" style="display:${this.clicked ? 'block' : 'none'};
                    z-index: 9999;">
                    ${this.questionoption
                      .filter((option) => option.questionid === this.question[i].questionid)
                      .map((option, index) => `<p id="select-option-${i}-${index}" class="select-option-multi${i}" style="display:${option.visible === 'no' ? 'none' : 'block'}">${option.name}</p>`)
                      .join('')}
                  </div>
                </div>
                <span class="inputType"><i class="fa fa-chevron-down input-icon"></i></span>
              </div>
              <p class="mat-hint-is-p"></p>
            </form>
          </div><br/><br/></div>
          `;
          this.render(myElement, myElement);}

      if (this.question[i].type === 'date') {
            const myElement = document.createElement('div');
            const myContainer = document.getElementById('test');
      
            if (myContainer) {
              myContainer.appendChild(myElement);
            }
      
            myElement.classList.add('selectdate'+ i);
            myElement.textContent = 'Hello, World!';
            myElement.innerHTML = `
            <div id='date${i}'>
            <label>${this.question[i].info}</label>
            <input type="date" id="dateinput${i}" "/> <br/><br/></div>
            `;
            this.render(myElement, myElement);}
      
      if (this.question[i].type === 'text') {
            const myElement = document.createElement('div');
            const myContainer = document.getElementById('test');

            if (myContainer) {
              myContainer.appendChild(myElement);
            }
          
            myElement.classList.add('textfield'+ i);
            myElement.textContent = 'Hello, World!';
            myElement.innerHTML = `
            <form id="text${i}" style="display:${this.question[i].visible === 'no' ? 'none' : 'block'}">
            <label>${this.question[i].info}</label>
             <div
               id="textInput" 
               class="inputForm"
             >
               <div class="input-wrapper">
                 <div class="inputField">
                   <input 
                     id="input-${i}"
                     autocomplete="off"
                     class="dropdown-button wide"
                     name="input"
                     placeholder="${this.question[i].placeholder}"
                   />
                 </div>
                 <span class="inputType"><i class="fa fa-pencil input-icon"></i></span>
               </div>
               <p id="validtext${i}" style="color:red"></p>
               <p class="mat-hint-is-p">
               ${this.question[i].pflicht ==='j' ? 'Pflichtfeld' : 'Freiwillige Angabe'}
               </p><br/><br/>
             </div>
           </form> `;
            this.render(myElement, myElement);}

      if (this.question[i].type === 'textarea') {
              const myElement = document.createElement('div');
              const myContainer = document.getElementById('test');
  
              if (myContainer) {
                myContainer.appendChild(myElement);
              }
            
              myElement.classList.add('textarea'+ i);
              myElement.textContent = 'Hello, World!';
              myElement.innerHTML = `
          <form id="textarea${i}">
            <div
              id="textareaInput"
              class="inputForm"
            >${this.question[i].info}
              <div class="input-wrapper">
                <div class="inputField">
                  <textarea
                    #input
                    autocomplete="off"
                    class="dropdown-button wide"
                    name="input-${i}"
                    rows="4"
                    maxlength="500"
                  ></textarea>
                  <p class="countLabel labelTextarea">
                  </p>
                </div>
              </div>
              <p class="mat-hint-is-p">
              ${this.question[i].pflicht ==='j' ? 'Pflichtfeld' : 'Freiwillige Angabe'}
              </p><br/>
            </div>
          </form>`;
              this.render(myElement, myElement);}

      if (this.question[i].type === 'upload') {
          const myElement = document.createElement('div');
          const myContainer = document.getElementById('test');
          console.log('input')
          if (myContainer) {
            myContainer.appendChild(myElement);
          }
        
          myElement.classList.add('upload'+ i);
          myElement.textContent = 'Hello, World!';
          myElement.innerHTML = `
        <form id="upload${i}">
          <div
            id="uploadInput"
            class="inputForm"
          >
            <div class="input-wrapper">
              <div class="inputField">
                <input
                  #fileUpload
                  type="file"
                  class="dropdown-button wide"
                  id="fileUpload"
                  style="display:none"
                />
                <input
                  #input
                  type="button"
                  class="dropdown-button wide"
                />
              </div>
              <span class="inputType"><i class="fa fa-upload input-icon"></i></span>
            </div>
            <p class="mat-hint-is-p">
            ${this.question[i].pflicht ==='j' ? 'Pflichtfeld' : 'Freiwillige Angabe'}
            </p>
          </div>
        </form>`;
          this.render(myElement, myElement);}

      if (this.question[i].type === 'multiupload') {
            const myElement = document.createElement('div');
            const myContainer = document.getElementById('test');
            console.log('input')
            if (myContainer) {
              myContainer.appendChild(myElement);
            }
          
            myElement.classList.add('multiupload'+ i);
            myElement.textContent = 'Hello, World!';
            myElement.innerHTML = `
            <form id="multiupload${i}">
            <div
              id="uploadInput"
              class="inputForm" 
            >
              <div class="input-wrapper">
                <div class="inputField"  style="display: none;">
                  <input
                    #fileUpload
                    type="file"
                    class="dropdown-button wide"
                    id="fileUpload"
                    (change)="
                      onFileInput($event);
                      
                      "
                    
                  />
                  <input
                    #input
                    type="button"
                    class="dropdown-button wide"
                    [pattern]="inputSetting[0].rule"
                    (click)="fileUpload.click()"
                  />
                </div>
                <input id="uploadbtn" type="button" value="Hier Dokument hochladen" (click)="fileUpload.click(); "/>
                <span class="inputType"><i class="fa fa-upload input-icon"></i></span>
              </div>
      
              <p class="mat-hint-is-p">
              ${this.question[i].pflicht ==='j' ? 'Pflichtfeld' : 'Freiwillige Angabe'}
              </p>
      
              <div
                *ngIf="!multipleUpload || multipleUpload.length === 0"
                class="centered bordered"
              >
                <p class="inputLabel">Keine Dateien ausgewählt.</p>
              </div>
      
              <div *ngIf="multipleUpload && multipleUpload.length > 0">
                <div
                  *ngFor="let upload of multipleUpload; index as i"
                  class="file-upload-form file-name bordered"
                >
                  <p *ngIf="upload.inProgress === false">
                    <a
                      *ngIf="upload.editable === true"
                      id="file-btn"
                      (click)="removeDocument('multiple', i);"
                    >
                      <i class="fa fa-close"></i>
                    </a>
                    {{ upload.file.name }}
                  </p>
      
                  <p *ngIf="upload.inProgress === true">
                    <i class="fa fa-refresh fa-spin"></i>
                    {{ upload.file.name }}
                  </p>
                </div>
              </div>
              <p class="inputLabel">Erlaubte Formate: PDF, PNG, JPEG, JPG, GIF.</p>
            </div>
          </form>`;
            this.render(myElement, myElement);}


  if(this.question[i].type === 'boolean'){
              console.log('success1')
    this.validateBoolean(i)
  }
  if (this.question[i].type === 'select') {
    this.validatemultiselect(i)
  }
    if(this.question[i].type === 'date'){
      this.validateDate(i)
    }
    if(this.question[i].type === 'text'){
    this.validateText(i)
    }

  }
}

validateBoolean(i:number){
  const inputElement = document.getElementById(`input-single-${i}`) as HTMLInputElement;
  const singleItemElement = document.getElementById(`singleItem-${i}`) as HTMLElement;
  const wholeElement = document.getElementById(`boolean${i}`) as HTMLElement
  if (this.question[i].visible === 'no'){
    wholeElement.style.display = 'none';
  }else{wholeElement.style.display = 'block'}
  const inputValue = inputElement.value;
  if (inputElement && inputElement) {
    let isMenuOpen = false;

    inputElement.addEventListener('click', () => {
      if (isMenuOpen) {
        singleItemElement.style.display = 'none';
        isMenuOpen = false;
      } else {
        singleItemElement.style.display = 'block';
        isMenuOpen = true;
      }
    });

  if (inputElement && singleItemElement) {
    inputElement.addEventListener('click', () => {
      singleItemElement.style.display = 'block';
    });
  
    const selectOptions = singleItemElement.getElementsByClassName('select-option');
  
    Array.from(selectOptions).forEach((option: Element) => {
      option.addEventListener('click', () => {
        const selectedOption = option as HTMLElement;
        if (selectedOption) {
          if(inputElement.value){
            
            const valuesingleToRemove = selectedOption.innerText.trim();
          
            this.answerssingle = this.answersmulti.filter((answer) => {
              return answer.value !== valuesingleToRemove;
            });
            

          const newAnswersingle = {
            id: `${i}`,
            value: selectedOption.innerText.trim(),
            question: this.question[i].name
          };        
          
          this.answerssingle.push(newAnswersingle);
         
          if(inputElement.value && newAnswersingle.value){
            inputElement.value = newAnswersingle.value;
            singleItemElement.style.display = 'none';}
        }else{
          const newAnswer = {
            id: `${i}`,
            value: selectedOption.innerText.trim(),
            question: this.question[i].name,
            questionid: this.question[i].questionid,
          };
          
          this.answerssingle.push(newAnswer);

          const singleinputElement = document.getElementById(`input-single-${i}`) as HTMLInputElement;
          if (singleinputElement) {
            singleinputElement.value = (singleinputElement.value || '') ? `${singleinputElement.value}, ${selectedOption.textContent}` : selectedOption.textContent as string;
          }
        }}
      });
    
    });
    document.addEventListener('click', (event: Event) => {
      if (!inputElement.contains(event.target as Node) && !inputElement.contains(event.target as Node)) {
        singleItemElement.style.display = 'none';
        isMenuOpen = false;
      }
    });
  }}
}

validatemultiselect(i:number){
  const multiinputElement = document.getElementById(`input-multiple-${i}`);
  const multiItemElement = document.getElementById(`multipleItem-${i}`) as HTMLElement;
  const wholeElement = document.getElementById(`multi${i}`) as HTMLElement
  const optionsmulti = document.getElementsByClassName(`select-option-multi${i}`);
  const alloptions = this.getallquestionoptions(i);


  if (multiinputElement && multiItemElement) {
    let isMenuOpen = false;

    multiinputElement.addEventListener('click', () => {
      if (isMenuOpen) {
        multiItemElement.style.display = 'none';
        isMenuOpen = false;
      } else {
        multiItemElement.style.display = 'block';
        isMenuOpen = true;
      }
    });

    const selectOptionsmulti = multiItemElement.getElementsByClassName(`select-option-multi${i}`);

    Array.from(selectOptionsmulti).forEach((option: Element) => {
      option.addEventListener('click', () => {
        const selectedOptionmulti = option as HTMLElement;
        if (selectedOptionmulti) {
          if (selectedOptionmulti.classList.contains("active")) {
            selectedOptionmulti.classList.remove("active");
            const valueToRemove = selectedOptionmulti.innerText.trim();
          
            this.answersmulti = this.answersmulti.filter((answer) => {
              return answer.value !== valueToRemove;
            });
            this.answersmultivalue = this.answersmultivalue.filter((answervalue) => {
              return answervalue !== valueToRemove;
            });
          
            this.answermulti = this.answersmulti.join(", ");

    
            const multiinputElement = document.getElementById(`input-multiple-${i}`) as HTMLInputElement;
            if (multiinputElement) {
              multiinputElement.value = (multiinputElement.value || '').split(", ")
                .filter((value) => value !== selectedOptionmulti.textContent)
                .join(", ") as string;
            }
          } else {
            selectedOptionmulti.classList.add("active");
            
            const newAnswer = {
              id: `${i}`, 
              value: selectedOptionmulti.innerText.trim(),
              question: this.question[i].name,
              questionid: this.question[i].questionid,
            };
            
            this.answersmulti.push(newAnswer);
            this.answersmultivalue.push(newAnswer.value)
            
            this.answermulti = this.answersmulti.join(", ");
    
            const multiinputElement = document.getElementById(`input-multiple-${i}`) as HTMLInputElement;
            if (multiinputElement) {
              multiinputElement.value = (multiinputElement.value || '') ? `${multiinputElement.value}, ${selectedOptionmulti.textContent}` : selectedOptionmulti.textContent as string;
            }
          }
        }
        multiItemElement.style.display = 'none';
        isMenuOpen = false;
      });
    });

    document.addEventListener('click', (event: Event) => {
      if (!multiinputElement.contains(event.target as Node) && !multiItemElement.contains(event.target as Node)) {
        multiItemElement.style.display = 'none';
        isMenuOpen = false;
      }
    });
  }
}

validateDate(i: number) {
  const geburtsdatum = document.getElementById(`dateinput${i}`) as HTMLInputElement;
  
  if (geburtsdatum) {
    geburtsdatum.addEventListener('change', () => {
      try {
        if (this.newdata.status === "OK") {
  
          var splitted = this.newdata.formatted.split(" ", 2);
          var test = geburtsdatum.value.split("-", 4);
          var date = this.newdata.formatted.split("-", 4);
          var minimumyear = date[0] - 16;
          var minimumdate = `${minimumyear}-${date[1]}-${date[2]}`;
          var minimumdateformatted = minimumdate.split(" ", 2);
          console.log(minimumdateformatted[0]);
          this.geburtsdatum = test[0];
          console.log(this.geburtsdatum);
          console.log(date[0]);
          console.log(this.geburtsdatum);
          var alter = date[0] - this.geburtsdatum;
  
          if (geburtsdatum.value < minimumdate) {
            this.status = 0;
          } else {
            this.status = 1;
          }
          
          this.alter = alter;
          const newAnswerdate = {
            id: `${i}`,
            value: geburtsdatum.value,
            question: this.question[i].name,
            questionid: this.question[i].questionid,
            age: alter
          };
  
          const index = this.answersdate.findIndex(answer => answer.id === newAnswerdate.id);
          if (index !== -1) {
            this.answersdate[index] = newAnswerdate;
          } else {
            this.answersdate.push(newAnswerdate);
          }
  
          this.answersdatevalue.push(newAnswerdate.value);
          this.answerdate = this.answersdate.join(", ");
        }
      } catch (error) {
        const geburtsdatum = document.getElementById(`dateinput-${i}`) as HTMLInputElement;
        console.log("failed");
        const date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var minimumyear = year - 16;
        var minimumdate = `${minimumyear}-${month}-${day}`;
        var currentDate = `${year}-${month}-${day}`;
  
        if (geburtsdatum.value < minimumdate) {
          this.status = 0;
        } else {
          this.status = 1;
        }
  
        if (this.date) {
          console.log(this.date);
        }
      }
    });
  }
}
validateText(i:number){
  const inputElementText = document.getElementById(`input-${i}`) as HTMLInputElement;
      console.log('test9');
      
      inputElementText.addEventListener('change', () => {
          if(inputElementText){
        const target = inputElementText as HTMLInputElement;
        {console.log(target)
        const text = target.value;
        {console.log(text)
        const regexapi = this.question[i].regex
        console.log(regexapi)
        const regex:RegExp = new RegExp(regexapi); //vor und nachname
        console.log(regex)
        if (regex.test(text)) {
          const validtext = document.getElementById(`validtext${i}`) as HTMLElement;
          validtext.innerText = ''
          if (inputElementText){
            const newAnswertext = {
              id: `${i}`, 
              value: inputElementText.value.trim(),
              question: this.question[i].name,
              questionid: this.question[i].questionid,
            };
            
            this.answerstext.push(newAnswertext);
            
            this.answertext = this.answersmulti.join(", ");
          }
          
        } else {
          const validtext = document.getElementById(`validtext${i}`) as HTMLElement;
          validtext.innerText = 'Ungültige Eingabe!'
        }
        
      }
     }
    }
  })
  }  

  evaluateExpression(expression: string) {
    // Verwendung von eval mit this
    const result = eval(expression);
    return result;
  }
async checkCondition(){

  for (let i = 0; i < this.question.length; i++) {
    var x = this.question[i].questionid
    

    if (this.question[i].condition === 'yes') {
      var test = this.getcondition();

        for (let p = 0; p < test.length; p++) {
          if(test[p].type === 'question'){
          if (x === test[p].questionid){
          var self = this;
          var variable1 = 'self.'+test[p].variable;
           console.log('after = question id')
          if(eval(variable1)){for(let s = 0; s < eval(variable1).length; s++){console.log(s)

            
            var formattedCondition = 'self.'+test[p].variable+'['+`${s}`+']'+ test[p].value;
          var variable = 'self.'+test[p].variable+'['+`${s}`+']';
          

          console.log(this.answersmulti)
          console.log(this.answersmultivalue)
          console.log(eval(variable))       
          console.log(formattedCondition)
          console.log(eval(variable1))
          if(eval(variable)){console.log(eval(variable))
          console.log(eval(formattedCondition));
          
          if (eval(formattedCondition)) {
            for(let q = 0; q < this.question.length; q++){

              if(this.question[q].name === test[p].questionactivate){
                var number = this.question[q].questionid; 
                var fieldtype = this.question[q].type
                var element = document.getElementById(`${fieldtype+number}`)
                if(element){
                  element.style.display = 'block';
                }else{console.log('process ended but failed, found no element')}
              }else{console.log('process ended but failed, question name doesnt fit', this.question[q].name)}
            }

           

            console.log('process ended')
      
          }else{
            for(let q = 0; q < this.question.length; q++){
              if(this.question[q].name === test[p].questionactivate){
                var number = this.question[q].questionid; console.log(number);
                var fieldtype = this.question[q].type
                var element = document.getElementById(`${fieldtype+number}`)
                if(element){
                  element.style.display = 'none';
                }
              }
            }
          }
        }

        }
      }}}
      }}else{console.log('couldnt find a condition',i);}
    
  
  for (let o = 0; o < this.questionoption.length; o++){
    
    }
  }

  for (let i = 0; i < this.condition.length; i++) {
    
    console.log(i)
    var test = this.getcondition();
    
  for(let p = 0; p < test.length; p++){console.log(p)
    if(test[p].type === 'option'){

      
  var self = this;

    var formattedCondition = 'self.'+test[p].variable+'['+`${0}`+']'+ test[p].value;
    var variable = 'self.'+test[p].variable+'['+`${0}`+']'
    if(eval(variable)){console.log(eval(variable))

    if (eval(formattedCondition)) {
      console.log('bedingung trifft zu');            

var options: { name: string; pflicht: string; prio: number; questionid: number; visible: string; }[] = [];
var questionid = test[p].questionid;

this.questionoption
  .filter((option) => option.questionid === questionid)
  .forEach((option, index) => {
    options.push(option)
  });

    if(options){
      for(let q = 0; q < options.length; q++){
        var type:string='';
        

        if(this.questionoption[q].name === test[p].optionactivate && this.questionoption[q].questionid === test[p].questionid){console.log('fit!!!!!!')
          for(let o = 0; o < this.question.length; o++){if(this.question[o].questionid=== questionid){var type = this.question[o].type;} }
          var number:number = 0;
          
          this.questionoption
              .filter((option) => option.questionid === questionid)  
              .forEach((option, index) => {
                if(option.name === this.questionoption[q].name){
                  number=index
                }
              })
          
          var questionid = this.questionoption[q].questionid; 
          var optionname = this.questionoption[q].name;

          var element = document.getElementById(`${type+'-option-'+questionid+'-'+number}`)
          if(element){
            element.style.display = 'block';
          }else{console.log('process ended but failed, found no element')}
        }else{console.log('process ended but failed, questionoption name doesnt fit', this.questionoption[q].name)}
      }

     
     console.log(i)
      console.log('process ended')

  }
    }else{
  var options: { name: string; pflicht: string; prio: number; questionid: number; visible: string; }[] = [];
  var questionid = test[p].questionid;

  this.questionoption
    .filter((option) => option.questionid === questionid)
    .forEach((option, index) => {
      options.push(option)
  });

    if(options){
      for(let q = 0; q < options.length; q++){
        var type:string='';
        
        if(this.questionoption[q].name === test[p].optionactivate && this.questionoption[q].questionid === test[p].questionid){console.log('fit!!!!!! but in else')
          for(let o = 0; o < this.question.length; o++){if(this.question[o].questionid=== questionid){console.log(this.question[o].type);var type = this.question[o].type;} }
          var number:number = 0;
          
          this.questionoption
              .filter((option) => option.questionid === questionid)  
              .forEach((option, index) => {
                if(option.name === this.questionoption[q].name){console.log('success');number=index}
                // number =+ index
                })
          
          var questionid = this.questionoption[q].questionid; 
          var optionname = this.questionoption[q].name
          var element = document.getElementById(`${type+'-option-'+questionid+'-'+number}`)
          if(element){
              element.style.display = 'none';
          }
        
        }else{console.log('failed')}}
      }
    }
  }
  
  }
  }
}
}

returnquestion(){
  const question = document.getElementById('frageanapi') as HTMLInputElement;
  return question.value 
}  
  handleClick() {
    this.clicked = true;
  }
  
  handleclickonmultiple() {
    this.clicked = true;
  }
  
  enableclick() {
    this.clicked = true;
  }

getallquestionoptions(i:number){
  const test = []
  for(let o = 0; o < this.questionoption.length; o++){if(this.questionoption[o].questionid === i) {test.push(this.questionoption[o])}}
  return test
}

  validatePerson() {
    const selectvalue = document.getElementById('für-wen') as HTMLInputElement;
    console.log(selectvalue.value)  
    this.person = selectvalue.value;
    
  }

  bmirechner(): any{
    var bmi;
    var height = document.getElementById('groesse') as HTMLInputElement;
    var heightformatted = +height.value;
    var weight = document.getElementById('gewicht') as HTMLInputElement;
    var weightformatted = +weight.value;
    if (weightformatted < 10 || weightformatted > 200) { alert("Falsches Gewicht.nBitte Daten erneut eingeben"); return null; }
    if (heightformatted < 50 || heightformatted > 250) { alert("Falsche Grösse.nBitte Daten erneut eingeben"); return null; }
    bmi = Math.round(weightformatted / (Math.pow((heightformatted/100),2)));
    var output = "Ihr BMI beträgt " + bmi + ".\n";
    if (bmi < 18) output += "Sie haben starkes Untergewicht.";
    if (bmi == 18) output += "Sie haben deutliches Untergewicht.";
    if (bmi == 19) output += "Sie haben leichtes Untergewicht.";
    if (bmi >= 20 && bmi <= 24) output += "Dies liegt im idealen Bereich.";
    if (bmi >= 25 && bmi <= 29) output += "Sie haben leichtes bis mässiges Übergewicht.";
    if (bmi >= 30 && bmi <= 39) output += "Sie haben deutliches Übergewicht.";
    if (bmi >= 40) output += "Sie haben sehr starkes Übergewicht.";
    alert(output);
    this.output= output;
  }

  impfung(){
  }
  
  async save(){
    console.log(this.answerssingle)
    const answerofmultiinput = this.answersmulti;
    const amswerofinput = this.answerssingle;
    const uploaddata = this.uploadeddata;
    const textanswer = this.answerstext;
    const age = this.answersdate;
    const test = 'teststorrage';
    this.saveDataToSessionStorage('Antworten multiselect', answerofmultiinput);
    this.saveDataToSessionStorage('Antworten select', amswerofinput);
    this.saveDataToSessionStorage('Antwort textfelder', textanswer);
    this.saveDataToSessionStorage('Geburtsdatum', age);

    // await this.getDataFromSessionStorage('test', test)
  }

  saveDataToSessionStorage(name: string, value: any) {
    
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(name, serializedValue);
  }

  getDataFromSessionStorage(key: string) {
    const userData = sessionStorage.getItem(key);
    console.log(userData);
  }
}
