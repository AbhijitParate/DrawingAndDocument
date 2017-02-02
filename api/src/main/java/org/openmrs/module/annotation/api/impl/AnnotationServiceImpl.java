/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.annotation.api.impl;

import org.openmrs.api.APIException;
import org.openmrs.api.UserService;
import org.openmrs.api.impl.BaseOpenmrsService;
import org.openmrs.module.annotation.Drawing;
import org.openmrs.module.annotation.api.AnnotationService;
import org.openmrs.module.annotation.api.dao.AnnotationDao;
import org.springframework.beans.factory.annotation.Autowired;

public class AnnotationServiceImpl extends BaseOpenmrsService implements AnnotationService {
	
	private AnnotationDao dao;
	
	@Autowired
	private UserService userService;
	
	/**
	 * Injected in moduleApplicationContext.xml
	 */
	public void setDao(AnnotationDao dao) {
		this.dao = dao;
	}
	
	/**
	 * Injected in moduleApplicationContext.xml
	 */
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	
	@Override
	public Drawing getItemByUuid(String uuid) throws APIException {
		return dao.getItemByUuid(uuid);
	}
	
	@Override
	public Drawing addOrUpdateDrawing(Drawing drawing) throws APIException {
		if (drawing.getOwner() == null) {
			drawing.setOwner(userService.getUser(1));
		}
		
		//		VisitService vs = Context.getVisitService();
		//		Visit visit = vs.getVisit(Integer.valueOf(drawing.getVisitId()));
		//
		//		Encounter encounter = new Encounter();
		//		encounter.setEncounterDatetime(new Date());
		//		encounter.setEncounterType(Context.getEncounterService().getEncounterType("Annotation"));
		//		encounter.setPatient(visit.getPatient());
		//		encounter.setLocation(visit.getLocation());
		//		//		Obs observation = new Obs();
		//		//		observation.setConcept(Context.getConceptService().getConcept(3));
		//		//		observation.setValueText("ksjfklshj");
		//		//		encounter.addObs(observation);
		//		visit.addEncounter(encounter);
		//		Context.getEncounterService().saveEncounter(encounter);
		//
		//		vs.saveVisit(visit);
		
		//		Context.flushSession();
		//		Context.clearSession();
		
		//		Integer encounterId = encounter.getEncounterId();
		
		return dao.addOrUpdateDrawing(drawing);
	}
	
	@Override
	public Drawing removeDrawing(Drawing drawing) {
		dao.removeDrawingBy(drawing);
		return drawing;
	}
}
