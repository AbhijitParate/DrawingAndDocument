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

import javax.activation.MimetypesFileTypeMap;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;

import static org.openmrs.module.annotation.ModuleContext.getContentFamily;

/**
 * Created by abhij on 2/17/2017.
 */
@Component(Constants.Component.OBSERVATION_SAVER)
public class ObservationSaver {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	@Autowired
	@Qualifier(Constants.Component.MODULE_CONTEXT)
	protected ModuleContext moduleContext;
	
	@Autowired
	@Qualifier(Constants.Component.COMPLEX_DATA_HELPER)
	protected ComplexDataHelper ComplexDataHelper;
	
	public Obs saveObservation(Person person, Encounter encounter, File file) throws IOException {
		log.debug("Saving observation");
		String mimeType = new MimetypesFileTypeMap().getContentType(file);
		log.debug("Received file name : " + file.getName());
		log.debug("Received mimeType : " + mimeType);
		Constants.ContentType contentType = getContentFamily(mimeType);
		log.debug("Generated contentType : " + contentType);
		ConceptComplex conceptComplex = moduleContext.getConceptComplex(contentType);
		Obs obs = new Obs(person, conceptComplex, new Date(), encounter.getLocation());
		
		Object obsData = new FileInputStream(file);
		
		ComplexData complexData = ComplexDataHelper.build(file.getName(), obsData, mimeType).asComplexData();
		
		obs.setComplexData(complexData);
		
		obs = moduleContext.getObsService().saveObs(obs, getClass().toString());
		
		return obs;
	}
}
