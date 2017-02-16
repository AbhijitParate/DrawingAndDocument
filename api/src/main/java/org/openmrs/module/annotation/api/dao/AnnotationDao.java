/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.annotation.api.dao;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.openmrs.api.db.hibernate.DbSession;
import org.openmrs.api.db.hibernate.DbSessionFactory;
import org.openmrs.module.annotation.Drawing;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("annotation.AnnotationDao")
public class AnnotationDao {
	
	@Autowired
	private DbSessionFactory sessionFactory;
	
	private static final Logger logger = LoggerFactory.getLogger(AnnotationDao.class);
	
	private DbSession getSession() {
		return sessionFactory.getCurrentSession();
	}
	
	public Drawing getItemByUuid(String uuid) {
		return (Drawing) getSession().createCriteria(Drawing.class).add(Restrictions.eq("uuid", uuid)).uniqueResult();
	}
	
	public Drawing addOrUpdateDrawing(Drawing drawing) {
		getSession().saveOrUpdate(drawing);
		logger.info("Drawing saved successfully, Drawing ID=" + drawing.getPatientId());
		return drawing;
	}
	
	public Drawing saveDrawing(Drawing drawing) {
		getSession().save(drawing);
		logger.info("Drawing saved successfully, Drawing ID=" + drawing.getPatientId());
		return drawing;
	}
	
	public List<Drawing> getAllDrawings(String patientId, String visitId) {
		Session session = getSession().getSessionFactory().getCurrentSession();
		SQLQuery query = session.createSQLQuery("SELECT *  FROM drawing d where d.patient_id ='" + patientId
		        + "' and d.visit_id ='" + visitId + "'");
		
		return (List<Drawing>) query.list();
	}
	
	public void removeDrawingBy(Drawing drawing) {
		getSession().delete(drawing);
	}
}
