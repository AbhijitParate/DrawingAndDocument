package org.openmrs.module.annotation;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.ConceptComplex;
import org.openmrs.Encounter;
import org.openmrs.Obs;
import org.openmrs.Person;
import org.openmrs.module.annotation.obs.datahelper.ComplexDataHelper;
import org.openmrs.obs.ComplexData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;

import static org.openmrs.module.annotation.Utils.*;

/**
 * Created by abhij on 2/17/2017.
 */
@Component(Constants.Component.OBSERVATION_SAVER)
public class ObservationSaver {
	
	private final Log log = LogFactory.getLog(getClass());
	
	@Autowired
	@Qualifier(Constants.Component.MODULE_CONTEXT)
	private ModuleContext moduleContext;
	
	@Autowired
	@Qualifier(Constants.Component.COMPLEX_DATA_HELPER)
	private ComplexDataHelper complexDataHelper;
	
	public Obs saveObservation(Person person, Encounter encounter, File file) throws IOException {
		log.error(".saveObservation() entered.");
		log.error("Received file name : " + file.getName());
		String fileExtension = getFileExtension(file.getName());
		log.error("fileExtension : " + fileExtension);
		String mimeType = getMimeTypeFromExtension(fileExtension);
		log.error("mimeType : " + mimeType);
		Constants.ContentType contentType = getContentFamily(mimeType);
		log.error("contentType : " + contentType);
		
		ConceptComplex conceptComplex = moduleContext.getConceptComplex(contentType);
		
		Obs obs = new Obs(person, conceptComplex, new Date(), encounter.getLocation());
		obs.setEncounter(encounter);
		obs.setComment(file.getName());
		
		Object obsData = new FileInputStream(file);
		ComplexData complexData = complexDataHelper.build(file.getName(), obsData, mimeType).asComplexData();
		
		obs.setComplexData(complexData);
		log.error("ValueComplex before saving Obs -> ");
		log.error(obs.getValueComplex());
		
		obs = moduleContext.getObsService().saveObs(obs, getClass().toString());
		
		log.error("ValueComplex after saving obs -> ");
		log.error(obs.getValueComplex());
		
		return obs;
	}
}
