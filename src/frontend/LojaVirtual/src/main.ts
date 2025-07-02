/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

//importacoes não default
import '@angular/localize/init';


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
