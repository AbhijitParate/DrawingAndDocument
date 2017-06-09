package org.openmrs.module.annotation.obs.handler;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.Obs;
import org.openmrs.module.annotation.Constants;
import org.openmrs.module.annotation.obs.data.ModuleComplexData;
import org.openmrs.module.annotation.obs.data.ValueComplex;
import org.openmrs.module.annotation.obs.datahelper.ComplexDataHelper;
import org.openmrs.obs.ComplexData;
import org.openmrs.obs.ComplexObsHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

/**
 * Abstract complex Obs handler which perform basic functions
 */
public abstract class AbstractComplexObsHandler implements ComplexObsHandler {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	private ComplexObsHandler complexObsHandler;
	
	@Autowired
	@Qualifier(Constants.Component.COMPLEX_DATA_HELPER)
	private ComplexDataHelper complexDataHelper;
	
	public AbstractComplexObsHandler() {
		super();
		//		log.info(getClass().getName() + ".AbstractComplexObsHandler()");
		setParentComplexObsHandler();
	}
	
	protected ComplexDataHelper getComplexDataHelper() {
		//		log.info(getClass().getName() + ".getComplexDataHelper()");
		return complexDataHelper;
	}
	
	protected abstract void setParentComplexObsHandler();
	
	abstract protected ComplexData readComplexData(Obs obs, ValueComplex valueComplex, String view);
	
	abstract protected boolean deleteComplexData(Obs obs, ModuleComplexData moduleComplexData);
	
	abstract protected ValueComplex saveComplexData(Obs obs, ModuleComplexData moduleComplexData);
	
	protected void setComplexObsHandler(ComplexObsHandler complexObsHandler) {
		//		log.info(getClass().getName() + ".setComplexObsHandler()");
		this.complexObsHandler = complexObsHandler;
	}
	
	final protected ComplexObsHandler getComplexObsHandler() {
		//		log.info(getClass().getName() + ".getComplexObsHandler()");
		return complexObsHandler;
	}
	
	/**
	 * Invoked by handler while retrieving the observation
	 * 
	 * @param obs - observation
	 * @param view - supports only "RAW_VIEW"
	 * @return - Observation
	 */
	@Override
	final public Obs getObs(Obs obs, String view) {
		//		log.info(getClass().getName() + ".getObs()");
		ValueComplex valueComplex = new ValueComplex(obs.getValueComplex());
		if (!ValueComplex.isValidModuleValueComplex(valueComplex.getValueComplex())) { // not our implementation
			return getComplexObsHandler().getObs(obs, view);
		}
		
		ComplexData docData = readComplexData(obs, valueComplex, view);
		obs.setComplexData(docData);
		return obs;
	}
	
	/**
	 * Invoked by handler while saving the complex obs
	 * 
	 * @param obs - observation
	 * @return - result boolean
	 */
	@Override
	final public boolean purgeComplexData(Obs obs) {
		//		log.info(getClass().getName() + ".purgeComplexData()");
		ModuleComplexData docData = fetchModuleComplexData(obs.getComplexData());
		if (docData == null) { // not our implementation
			if (obs.getComplexData() == null) {
				//				log.error("Complex data was null and hence was not purged for OBS_ID='" + obs.getObsId() + "'.");
				return false;
			} else {
				return getComplexObsHandler().purgeComplexData(obs);
			}
		}
		
		return deleteComplexData(obs, docData);
	}
	
	/**
	 * Invoked by handler while saving the obs
	 * 
	 * @param obs -
	 *            {@link org.openmrs.module.emrapi.encounter.domain.EncounterTransaction.Observation}
	 * @return Obs
	 */
	@Override
	final public Obs saveObs(Obs obs) {
		//		log.info(getClass().getName() + ".saveObs()");
		// get module obs data and cast it to ModuleComplexData
		ModuleComplexData moduleComplexData = fetchModuleComplexData(obs.getComplexData());
		if (moduleComplexData == null) { // not our implementation
			if (obs.getComplexData() == null) {
				//				log.debug("Complex data was null and hence was not saved for OBS_ID='" + obs.getObsId() + "'.");
				return obs;
			} else {
				//				log.debug("Complex data was not null.");
				return getComplexObsHandler().saveObs(obs);
			}
		}
		
		ValueComplex valueComplex = saveComplexData(obs, moduleComplexData);
		//		log.info(getClass().getSimpleName() + "generated valueComplex -> " + valueComplex.getValueComplex());
		obs.setValueComplex(valueComplex.getValueComplex());
		return obs;
	}
	
	/**
	 * Casts {@link ComplexData} object to {@link ModuleComplexData} object
	 * 
	 * @param complexData - {@link ComplexData}
	 * @return - {@link ModuleComplexData}
	 */
	public static ModuleComplexData fetchModuleComplexData(ComplexData complexData) {
		if (!(complexData instanceof ModuleComplexData)) {
			return null;
		}
		
		ModuleComplexData moduleComplexData = (ModuleComplexData) complexData;
		return moduleComplexData;
	}
}
