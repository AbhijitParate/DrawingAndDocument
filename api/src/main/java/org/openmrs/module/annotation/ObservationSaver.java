package org.openmrs.module.annotation;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.ConceptComplex;
import org.openmrs.Encounter;
import org.openmrs.Obs;
import org.openmrs.Person;
import org.openmrs.module.annotation.obs.data.ModuleComplexData;
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
	
	public Obs saveObservationFromFile(Person person, Encounter encounter, File file) throws IOException {
		log.error(getClass().getSimpleName() + ".saveObservationFromFile() entered.");
		log.error("Received file name : " + file.getName());
		String fileExtension = getFileExtension(file.getName());
		log.error("fileExtension : " + fileExtension);
		String mimeType = getMimeTypeFromExtension(fileExtension);
		log.error("mimeType : " + mimeType);
		Constants.ContentType contentType = getContentType(mimeType);
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
	
	public Obs saveObservationFromUuid(Person person, Encounter encounter, String obsUuid) throws IOException {
		log.error(getClass().getSimpleName() + ".saveObservationFromUuid() entered.");
		log.error("Received UUID name : " + obsUuid);
		
		// Getting the Core/Platform complex data object
		Obs obs = moduleContext.getObsService().getObsByUuid(obsUuid);
		Obs complexObs = moduleContext.getObsService().getComplexObs(obs.getObsId(), "");
		ComplexData complexData = complexObs.getComplexData();
		
		// Switching to our complex data object
		// ValueComplex valueComplex = new ValueComplex(obs.getValueComplex());
		ModuleComplexData moduleComplexData = moduleContext.getComplexDataHelper().build(complexData);
		
		String fileExtension = getFileExtension(moduleComplexData.getTitle());
		log.error("fileExtension : " + fileExtension);
		
		String mimeType = moduleComplexData.getMimeType();
		log.error("mimeType : " + mimeType);
		
		Constants.ContentType contentType = getContentType(mimeType);
		log.error("contentType : " + contentType);
		
		ConceptComplex conceptComplex = moduleContext.getConceptComplex(contentType);
		
		Obs newObs = new Obs(person, conceptComplex, new Date(), encounter.getLocation());
		newObs.setEncounter(encounter);
		newObs.setComment(obs.getComment());
		
		Object obsData = moduleComplexData.asInputStream();
		ComplexData newComplexData = complexDataHelper.build(moduleComplexData.getTitle(), obsData, mimeType)
		        .asComplexData();
		
		newObs.setComplexData(newComplexData);
		log.error("ValueComplex before saving Obs -> ");
		log.error(newObs.getValueComplex());
		
		newObs = moduleContext.getObsService().saveObs(newObs, getClass().toString());
		
		log.error("ValueComplex after saving obs -> ");
		log.error(newObs.getValueComplex());
		
		return newObs;
	}
}
