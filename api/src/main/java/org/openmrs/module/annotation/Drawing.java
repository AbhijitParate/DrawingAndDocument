/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
package org.openmrs.module.annotation;

import org.openmrs.BaseOpenmrsData;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Please note that a corresponding table schema must be created in liquibase.xml.
 */
//Uncomment 2 lines below if you want to make the Drawing class persistable, see also AnnotationDaoTest and liquibase.xml
@Entity(name = "annotation.Drawing")
@Table(name = "drawing")
public class Drawing extends BaseOpenmrsData implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "drawing_id")
	private Integer id;
	
	//	@ManyToOne
	//	@JoinColumn(name = "owner")
	//	@Basic
	//	@Column(name = "description")
	//	private Integer owner;
	
	@Basic
	@Column(name = "description")
	private String description;
	
	@Basic
	@Column(name = "patient_id")
	private String patientId;
	
	@Basic
	@Column(name = "visit_id")
	private String visitId;
	
	@Basic
	@Column(name = "svg_id")
	private String svgId;
	
	@Override
	public Integer getId() {
		return id;
	}
	
	@Override
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Override
	public String getUuid() {
		return super.getUuid();
	}
	
	@Override
	public void setUuid(String uuid) {
		super.setUuid(uuid);
	}
	
	//	public Integer getOwner() {
	//		return owner;
	//	}
	//
	//	public void setOwner(Integer owner) {
	//		this.owner = owner;
	//	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getPatientId() {
		return patientId;
	}
	
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	
	public String getVisitId() {
		return visitId;
	}
	
	public void setVisitId(String visitId) {
		this.visitId = visitId;
	}
	
	public String getSvgId() {
		return svgId;
	}
	
	public void setSvgId(String svgId) {
		this.svgId = svgId;
	}
}
