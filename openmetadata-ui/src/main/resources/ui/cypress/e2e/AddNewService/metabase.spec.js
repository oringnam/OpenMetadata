/*
 *  Copyright 2021 Collate
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { deleteCreatedService, editOwnerforCreatedService, goToAddNewServicePage, login, testServiceCreationAndIngestion, updateDescriptionForIngestedTables, uuid } from '../../common/common';
import { LOGIN, SERVICE_TYPE } from '../../constants/constants';

const serviceType = 'Metabase';
const serviceName = `${serviceType}-ct-test-${uuid()}`;
const tableName = 'jaffle_shop';
const description = `This is ${serviceName} description`;

describe('Metabase Ingestion', () => {
  beforeEach(() => {
    login(LOGIN.username, LOGIN.password);
    cy.goToHomePage();
  });
  it('add and ingest data', () => {
    goToAddNewServicePage(SERVICE_TYPE.Dashboard);

    // Select Dashboard services
    cy.get('[data-testid="service-category"]').select('dashboardServices');

    const connectionInput = () => {
      cy.get('#root_username').type(Cypress.env('metabaseUsername'));
      cy.get('#root_password')
        .scrollIntoView()
        .type(Cypress.env('metabasePassword'));
      cy.get('#root_hostPort')
        .scrollIntoView()
        .type(Cypress.env('metabaseHostPort'));
    };

    const addIngestionInput = () => {
      // no filters
    };

    testServiceCreationAndIngestion(
      serviceType,
      connectionInput,
      addIngestionInput,
      serviceName,
      'dashboard'
    );
  });

  it('Update table description and verify', () => {
    updateDescriptionForIngestedTables(
      serviceName,
      tableName,
      description,
      SERVICE_TYPE.Dashboard,
      'dashboards'
    );
  });

  it('Edit and validate owner', () => {
    editOwnerforCreatedService(SERVICE_TYPE.Dashboard, serviceName);
  });

  it('delete created service', () => {
    deleteCreatedService(SERVICE_TYPE.Dashboard, serviceName);
  });
});
