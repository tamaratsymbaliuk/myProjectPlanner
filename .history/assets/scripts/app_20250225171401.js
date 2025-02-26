class DOMHelper {
    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }

    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(element); // will be moved
        element.scrollIntoView({behavior: 'smooth'});
    }
}

class Component {
    constructor(hostElementId, insertBefore = false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;
    }

    detach() {
        if (this.element) {
            this.element.remove(); // this refers to subclass
         //this.element.parentElement.removeChild(this.element); // for older browsers
        }    
    }

    attach() {
       //document.body.append(this.element);
       this.hostElement.insertAdjacentElement(this.insertBefore ? 'afterbegin' : 'beforeend', this.element);
    }

}


class Tooltip extends Component {
    constructor(closeNotifierFunction, text, hostElementId) {
        super(hostElementId);
        this.closeNotifier = closeNotifierFunction;
        this.text = text;
        this.create();
    }

    closeTooltip = () => { //using arrow function as we don't need to bind this
        this.detach();
        this.closeNotifier();
    }

    create() {
       const tooltipElement = document.createElement('div');
       tooltipElement.className = 'card';
       const tooltipTemplate = document.getElementById('tooltip');
       const tooltipBody = document.importNode(tooltipTemplate.content, true);
       tooltipBody.querySelector('p').textContent = this.text;
       tooltipElement.append(tooltipBody);
       
       //console.log(this.hostElement.getBoundingClientRect());
       
       const hostElPosLeft = this.hostElement.offsetLeft;
       const hostElPosTop = this.hostElement.offsetTop;
       const hostElHeight = this.hostElement.clientHeight;
       const parentElementScrolling = this.hostElement.parentElement.scrollTop;

       const x = hostElPosLeft + 20;
       const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

       tooltipElement.style.position = 'absolute';
       tooltipElement.style.left = x + 'px'; //500px
       tooltipElement.style.top = y + 'px';

   
       tooltipElement.addEventListener('click', this.closeTooltip);
       this.element = tooltipElement
    }
}

class ProjectItem {
    hasActiveTooltip = false;


    constructor(id, updateProjectListsFunction, type) {
        this.id = id;
        this.updateProjectListsHandler = updateProjectListsFunction;
        this.connectMoreInfoButton();
        this.connectSwithButton(type);
        this.connectDrag();
    }

    showMoreInfoHandler() {
        if (this.hasActiveTooltip) {
            return;
        }
        const projectElement = document.getElementById(this.id); // project item id
        const tooltipText = projectElement.dataset.extraInfo; // using data-extra-info html element
        //console.log(projectElement.dataset);
        //projectElement.dataset.someInfo = 'Test';
        const tooltip = new Tooltip(() => {
            this.hasActiveTooltip = false;
        }, tooltipText, this.id);
        tooltip.attach();
        this.hasActiveTooltip = true;

    }

    connectDrag() { // will drop in the ProjectList class
        document.getElementById(this.id).addEventListener('dragstart', event => {
            event.dataTransfer.setData('text/plain', this.id);
            event.dataTransfer.effectAllowed = 'move';
        });
    }

    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfoBtn = projectItemElement.querySelector('button:first-of-type');// we need first button More Info
        moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this)); // bind this to project item
    }

    connectSwithButton(type) {
        const projectItemElement = document.getElementById(this.id);
        let switchBtn = projectItemElement.querySelector('button:last-of-type'); // we need last button
        switchBtn = DOMHelper.clearEventListeners(switchBtn);
        switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
        switchBtn.addEventListener('click', this.updateProjectListsHandler.bind(null, this.id));

    }

    update(updateProjectListsFn, type) {
        this.updateProjectListsHandler = updateProjectListsFn;
        this.connectSwithButton(type);
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;
        const prjitems = document.querySelectorAll(`#${type}-projects li`); // using All since we need list and not just one item
        //console.log(prjitems);
        for (const prjItem of prjitems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type));
        }
        console.log(this.projects);
        this.connectDroppable();
    }

    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);

    }

    connectDroppable() {
        const list = document.querySelectorAll(`#${type}-projects ul`);

        list.addEventListener('dragenter', event => {
            if (event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
            }
            list.parentElement
            
        });

        list.addEventListener('dragover', event => {
            if (event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
            }
        });


    }

    switchProject(projectId) {
        //const projectIndex = this.projects.findIndex(p => p.id === projectId);
        //this.projects.splice(projectIndex, 1);
        this.switchHandler(this.projects.find(p => p.id === projectId));
        this.projects = this.projects.filter(p => p.id !== projectId)
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');
        activeProjectList.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList));
        finishedProjectList.setSwitchHandlerFunction(activeProjectList.addProject.bind(activeProjectList));   
        
       /*const timerId = setTimeout(this.startAnalytics, 3000);

    document.getElementById('stop-analytics-btn').addEventListener('click', () => {
      clearTimeout(timerId);
    });
    */
  }

  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/scripts/analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();
