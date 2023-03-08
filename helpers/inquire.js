import colors from 'colors';
import inquirer from 'inquirer';

const optPausa = [
  {
    type: 'input',
    name: 'pausa',
    message: `Press ${'ENTER'.yellow} to continue...`,
    waitUserInput: true
  }
]

const opts = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Choose your option',
    choices: [
      {
        name: '1.Search a pokemon',
        value: 1
      },
      {
        name: '2.Search evolution chain',
        value: 2
      },
      {
        name: '0.Exit',
        value: 0
      }
    ]
  }
];

export const inquireMenu = async () => {

  await tituloMenu();
  const { opcion } = await inquirer.prompt(opts);

  return opcion;

}

export const pausa = async () => {

  const opcion = await inquirer.prompt(optPausa);

  return opcion;

}

export const leerInput = async (message) => {

  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please enter a value';
        }

        return true;
      }
    }
  ]

  const { desc } = await inquirer.prompt(question);

  return desc;

}

const tituloMenu = () => {

  return new Promise((resolve) => {

    console.clear();
    console.log('              _'.yellow);
    console.log('  _ __   ___ | | _____ _ __ ___   ___  _ __  '.yellow);
    console.log(' |  _ | | _ || || | _ |  _   _  || _ ||  _  |'.yellow);
    console.log(' | |_) | (_) |   <| __/ | | | | | (_) | | | |'.yellow);
    console.log(' | .__/ |___/|_||_|___|_| |_| |_||___/|_| |_|'.yellow);
    console.log(' |_|  '.yellow);
    const divisor = console.log('<=============================================>'.red);

    resolve(divisor);

  });

}

export const listadoLugares = async (lugares = []) => {

  const choices = lugares.map((lugar, idx) => {

    return {
      value: lugar.id,
      name: `${colors.green(idx + 1 + '.')} ${lugar.nombre}`
    }

  })

  choices.unshift({
    value: '0',
    name: `${colors.green('0.')} Cancelar`
  })

  const optsBorrar = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione un lugar:',
      choices
    }
  ]

  const { id } = await inquirer.prompt(optsBorrar);
  return id;

}

export const mostrarListadoChecklist = async (tareas = []) => {

  const choices = tareas.map((tarea, idx) => {

    return {
      value: tarea.id,
      name: `${colors.green(idx + 1)} ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false
    }

  })

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(pregunta);
  return ids;

}

export const confirmar = async (message) => {

  const question = [
    {
      type: 'confirm',
      name: 'Ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question);
  return ok;

}

