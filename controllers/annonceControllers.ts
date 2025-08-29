import { Controller } from "../libs/Controller";

interface Annonce {
  id: number;
  title: string;
  description: string;
  tags: {class: string, label: string}[];
  missionType: string;
  onboarding: string;
  salary: number;
  salaryUnit: string;
  password: string;
}

const tagMap: {[key: string]: {class: string, label: string}} = {
  'API REST': {class: 'api', label: 'API REST'},
  'TypeScript': {class: 'typescript', label: 'TypeScript'},
  'React': {class: 'react', label: 'React'},
  'Node.js': {class: 'node', label: 'Node.js'},
  'PHP': {class: 'php', label: 'PHP'},
};

let annonces: Annonce[] = [
  {
    id: 1,
    title: "Développeur(se) Web",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices diam at magna vehicula aliquam. In elementum sit amet tellus vel fermentum.",
    tags: [
      {class: 'php', label: 'PHP'},
      {class: 'typescript', label: 'TypeScript'},
      {class: 'react', label: 'React'}
    ],
    missionType: "CDI",
    onboarding: "Immédiat",
    salary: 35000,
    salaryUnit: "€ brut annuel",
    password: "password123"
  },
  {
    id: 2,
    title: "Développeur(se) d'application",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices diam at magna vehicula aliquam. In elementum sit amet tellus vel fermentum.",
    tags: [
      {class: 'typescript', label: 'TypeScript'},
      {class: 'react', label: 'React'},
      {class: 'api', label: 'API REST'}
    ],
    missionType: "Freelance",
    onboarding: "Dans 1 semaine",
    salary: 400,
    salaryUnit: "€ par jour",
    password: "password123"
  },
  {
    id: 3,
    title: "Développeur(se) mobile",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices diam at magna vehicula aliquam. In elementum sit amet tellus vel fermentum.",
    tags: [
      {class: 'node', label: 'Node.js'},
      {class: 'react', label: 'React'},
      {class: 'api', label: 'API REST'}
    ],
    missionType: "CDD",
    onboarding: "Dans 1 mois",
    salary: 3000,
    salaryUnit: "€ brut mensuel",
    password: "password123"
  },
  {
    id: 4,
    title: "Développeur(se) logiciel",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices diam at magna vehicula aliquam. In elementum sit amet tellus vel fermentum.",
    tags: [
      {class: 'typescript', label: 'TypeScript'},
      {class: 'api', label: 'API REST'},
      {class: 'php', label: 'PHP'}
    ],
    missionType: "CDI",
    onboarding: "Dans 3 mois",
    salary: 42000,
    salaryUnit: "€ brut annuel",
    password: "password123"
  },
  {
    id: 5,
    title: "Développeur(se) IA",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices diam at magna vehicula aliquam. In elementum sit amet tellus vel fermentum.",
    tags: [
      {class: 'react', label: 'React'},
      {class: 'typescript', label: 'TypeScript'},
      {class: 'api', label: 'API REST'}
    ],
    missionType: "Freelance",
    onboarding: "Immédiat",
    salary: 500,
    salaryUnit: "€ par jour",
    password: "password123"
  }
];

let nextId = 6;

export class annonceControllers extends Controller {
  public index() {
    const latestAnnonces = annonces.slice(0, 3);
    this.response.render("pages/home", { layout: 'layout', latestAnnonces });
  }

  public list() {
    const success = this.request.query.success;
    let flash = null;
    if (success === "true") {
      flash = {
        type: "success",
        message: "L'annonce a bien été créée.",
      };
    } 
    this.response.render("pages/annonceList", { layout: 'layout', annonces, flash });
  }

  public show() {
    const id = this.request.params.id;
    if (!id) {
      return this.response.status(404).send("ID is missing");
    }
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return this.response.status(404).send("Invalid ID");
    }
    const annonce = annonces.find((a) => a.id === parsedId);
    if (!annonce) {
      return this.response.status(404).send("Not found");
    }
    this.response.render("pages/annonce", { layout: 'layout', annonce });
  }

  public createForm() {
    this.response.render("pages/creation", { layout: 'layout' });
  }

  public create() {
    const { title, description, skills, missionType, onboarding, salary, salaryUnit, password } = this.request.body;


    if (title && title.length > 50) {
      return this.response.status(400).render("pages/creation", { 
        layout: 'layout',
        error: "Le titre ne doit pas dépasser 50 caractères."
      });
    }
    if (description && description.length > 500) {
      return this.response.status(400).render("pages/creation", { 
        layout: 'layout',
        error: "La description ne doit pas dépasser 500 caractères."
      });
    }
    if (password && password.length > 50) {
      return this.response.status(400).render("pages/creation", { 
        layout: 'layout',
        error: "Le mot de passe ne doit pas dépasser 50 caractères."
      });
    }

    const tagsArr = skills ? (Array.isArray(skills) ? skills : [skills]) : [];
    const tags = tagsArr.map(s => tagMap[s] || {class: s.toLowerCase(), label: s});
    
    annonces.push({
      id: nextId++,
      title,
      description,
      tags,
      missionType,
      onboarding,
      salary: parseInt(salary),
      salaryUnit,
      password,
    });
    
    this.response.redirect('/annonces?success=true');
  }

  public editForm() {
    const id = this.request.params.id;
    if (!id) {
      return this.response.status(404).send("ID is missing");
    }
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return this.response.status(404).send("Invalid ID");
    }
    const annonce = annonces.find((a) => a.id === parsedId);
    if (!annonce) {
      return this.response.status(404).send("Not found");
    }
    this.response.render("pages/edition", { layout: 'layout', annonce });
  }

  public update() {
    const id = this.request.params.id;
    if (!id) {
      return this.response.status(404).send("ID is missing");
    }
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return this.response.status(404).send("Invalid ID");
    }
    const annonce = annonces.find((a) => a.id === parsedId);
    if (!annonce) {
      return this.response.status(404).send("Not found");
    }
    
    const { password, title, description, skills, missionType, onboarding, salary, salaryUnit } = this.request.body;
    
    if (title && title.length > 50) {
      return this.response.status(400).render("pages/edition", { 
        layout: 'layout',
        annonce,
        error: "Le titre ne doit pas dépasser 50 caractères."
      });
    }
    if (description && description.length > 500) {
      return this.response.status(400).render("pages/edition", { 
        layout: 'layout',
        annonce,
        error: "La description ne doit pas dépasser 500 caractères."
      });
    }
    if (password && password.length > 50) {
      return this.response.status(400).render("pages/edition", { 
        layout: 'layout',
        annonce,
        error: "Le mot de passe ne doit pas dépasser 50 caractères."
      });
    }
    
    if (password !== annonce.password) {
      return this.response.redirect(`/annonces/${parsedId}/edit?error=wrongpassword`);
    }
    
    const tagsArr = skills ? (Array.isArray(skills) ? skills : [skills]) : [];
    const tags = tagsArr.map((s: string) => tagMap[s] || { class: s.toLowerCase(), label: s });
    
    annonce.title = title;
    annonce.description = description;
    annonce.tags = tags;
    annonce.missionType = missionType;
    annonce.onboarding = onboarding;
    annonce.salary = parseInt(salary);
    annonce.salaryUnit = salaryUnit;
    
    this.response.redirect("/annonces/" + parsedId);
  }

  public deleteForm() {
    const id = this.request.params.id;
    if (!id) {
      return this.response.status(404).send("ID is missing");
    }
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return this.response.status(404).send("Invalid ID");
    }
    const annonce = annonces.find((a) => a.id === parsedId);
    if (!annonce) {
      return this.response.status(404).send("Not found");
    }
    this.response.render("pages/delete", { layout: 'layout', id: parsedId, title: annonce.title });
  }

  public delete() {
    const id = this.request.params.id;
    if (!id) {
      return this.response.status(404).send("ID is missing");
    }
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return this.response.status(404).send("Invalid ID");
    }
    const annonceIndex = annonces.findIndex((a) => a.id === parsedId);
    if (annonceIndex === -1) {
      return this.response.status(404).send("Not found");
    }
    const annonce = annonces[annonceIndex]; 
    if (!annonce) {
      return this.response.status(404).send("Not found");
    }
    
    const { password } = this.request.body;
    
    if (password !== annonce.password) {
      return this.response.redirect(`/annonces/${parsedId}/delete?error=wrongpassword`);
    }
    
    annonces.splice(annonceIndex, 1);
    this.response.redirect("/annonces");
  }
}