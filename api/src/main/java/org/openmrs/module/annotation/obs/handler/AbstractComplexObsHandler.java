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
 * Created by abhijit on 2/8/17.
 */
public abstract class AbstractComplexObsHandler implements ComplexObsHandler {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	private ComplexObsHandler complexObsHandler;
	
	@Autowired
	@Qualifier(Constants.Component.COMPLEX_DATA_HELPER)
	private ComplexDataHelper complexDataHelper;
	
	public AbstractComplexObsHandler() {
		super();
		log.info(getClass().getName() + ".AbstractComplexObsHandler()");
		setParentComplexObsHandler();
	}
	
	protected ComplexDataHelper getComplexDataHelper() {
		log.info(getClass().getName() + ".getComplexDataHelper()");
		return complexDataHelper;
	}
	
	protected abstract void setParentComplexObsHandler();
	
	abstract protected ComplexData readComplexData(Obs obs, ValueComplex valueComplex, String view);
	
	abstract protected boolean deleteComplexData(Obs obs, ModuleComplexData moduleComplexData);
	
	abstract protected ValueComplex saveComplexData(Obs obs, ModuleComplexData moduleComplexData);
	
	protected void setComplexObsHandler(ComplexObsHandler complexObsHandler) {
		log.info(getClass().getName() + ".setComplexObsHandler()");
		this.complexObsHandler = complexObsHandler;
	}
	
	// 14
	final protected ComplexObsHandler getComplexObsHandler() {
		log.info(getClass().getName() + ".getComplexObsHandler()");
		return complexObsHandler;
	}
	
	@Override
	final public Obs getObs(Obs obs, String view) {
		log.info(getClass().getName() + ".getObs()");
		ValueComplex valueComplex = new ValueComplex(obs.getValueComplex());
		if (!ValueComplex.isValidModuleValueComplex(valueComplex.getValueComplex())) { // not our implementation
			return getComplexObsHandler().getObs(obs, view);
		}
		
		ComplexData docData = readComplexData(obs, valueComplex, view);
		obs.setComplexData(docData);
		return obs;
	}
	
	@Override
	final public boolean purgeComplexData(Obs obs) {
		log.info(getClass().getName() + ".purgeComplexData()");
		ModuleComplexData docData = fetchModuleComplexData(obs.getComplexData());
		if (docData == null) { // not our implementation
			if (obs.getComplexData() == null) {
				log.error("Complex data was null and hence was not purged for OBS_ID='" + obs.getObsId() + "'.");
				return false;
			} else {
				return getComplexObsHandler().purgeComplexData(obs);
			}
		}
		
		return deleteComplexData(obs, docData);
	}
	
	@Override
	final public Obs saveObs(Obs obs) {
		log.info(getClass().getName() + ".saveObs()");
		// get module obs data and cast it to ModuleComplexData
		ModuleComplexData moduleComplexData = fetchModuleComplexData(obs.getComplexData());
		if (moduleComplexData == null) { // not our implementation
			if (obs.getComplexData() == null) {
				log.error("Complex data was null and hence was not saved for OBS_ID='" + obs.getObsId() + "'.");
				return obs;
			} else {
				log.error("Complex data was not null.");
				return getComplexObsHandler().saveObs(obs);
			}
		}
		
		ValueComplex valueComplex = saveComplexData(obs, moduleComplexData);
		log.info(getClass().getSimpleName() + "generated valueComplex -> " + valueComplex.getValueComplex());
		obs.setValueComplex(valueComplex.getValueComplex());
		return obs;
	}
	
	// 11a
	public static ModuleComplexData fetchModuleComplexData(ComplexData complexData) {
		if (!(complexData instanceof ModuleComplexData)) {
			return null;
		}
		
		ModuleComplexData moduleComplexData = (ModuleComplexData) complexData;
		//		String obsType = moduleComplexData.getObsType();
		//		if (!obsType.startsWith(Constants.ObsType.)) {
		//			return null;
		//		}
		return moduleComplexData;
	}
}
