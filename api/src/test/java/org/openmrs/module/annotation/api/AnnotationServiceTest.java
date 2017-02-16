/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.annotation.api;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openmrs.api.UserService;
import org.openmrs.module.annotation.Drawing;
import org.openmrs.module.annotation.api.dao.AnnotationDao;
import org.openmrs.module.annotation.api.impl.AnnotationServiceImpl;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.beans.HasPropertyWithValue.hasProperty;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;

/**
 * This is a unit test, which verifies logic in AnnotationService. It doesn't extend
 * BaseModuleContextSensitiveTest, thus it is run without the in-memory DB and Spring context.
 */
public class AnnotationServiceTest {
	
	@InjectMocks
	AnnotationServiceImpl basicModuleService;
	
	@Mock
	AnnotationDao dao;
	
	@Mock
	UserService userService;
	
	@Before
	public void setupMocks() {
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void saveItem_shouldSetOwnerIfNotSet() {
		//Given
		Drawing drawing = new Drawing();
		drawing.setDescription("some description");
		
		when(dao.addOrUpdateDrawing(drawing)).thenReturn(drawing);
		
		//		User user = new User();
		//		when(userService.getUser(1)).thenReturn(user);
		
		//When
		basicModuleService.addOrUpdateDrawing(drawing);
		
		//Then
		assertThat(drawing, hasProperty("description", is("some description")));
	}
}
