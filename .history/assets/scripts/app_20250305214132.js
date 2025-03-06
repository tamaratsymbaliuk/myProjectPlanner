

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
        const list = document.querySelector(`#${this.type}-projects ul`);

        list.addEventListener('dragenter', event => {
            if (event.dataTransfer.types[0] === 'text/plain') {
                list.parentElement.classList.add('droppable');
                event.preventDefault();
            }     
        });

        list.addEventListener('dragover', event => {
            if (event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
            }
        });

        list.addEventListener('dragleave', event => {
            if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) { // only if not in the list remove droppable
                list.parentElement.classList.remove('droppable');
            }    
        });

        list.addEventListener('drop', event => {
            const prjId = event.dataTransfer.getData('text/plain');
            if (this.projects.find(p => p.id === prjId)) { // if the project id is in the list it was part of we don't want to drop it
                return;
            }
            document.getElementById(prjId).querySelector('button:last-of-type').click();
            list.parentElement.classList.remove('droppable');
            //event.preventDefault(); // not required
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
    analyticsScript.src = 'assets/scripts/Utility/Analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();
