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
	
	private ComplexObsHandler parent;
	
	@Autowired
	@Qualifier(Constants.Component.COMPLEX_DATA_HELPER)
	private ComplexDataHelper complexDataHelper;
	
	public AbstractComplexObsHandler() {
		super();
		setParentComplexObsHandler();
	}
	
	protected ComplexDataHelper getComplexDataHelper() {
		return complexDataHelper;
	}
	
	protected abstract void setParentComplexObsHandler();
	
	abstract protected ComplexData readComplexData(Obs obs, ValueComplex valueComplex, String view);
	
	abstract protected boolean deleteComplexData(Obs obs, ModuleComplexData moduleComplexData);
	
	abstract protected ValueComplex saveComplexData(Obs obs, ModuleComplexData moduleComplexData);
	
	protected void setParent(ComplexObsHandler complexObsHandler) {
		this.parent = complexObsHandler;
	}
	
	final protected ComplexObsHandler getParent() {
		return parent;
	}
	
	public static ModuleComplexData fetchModuleComplexData(ComplexData complexData) {
		
		if (!(complexData instanceof ModuleComplexData)) {
			return null;
		}
		
		ModuleComplexData moduleComplexData = (ModuleComplexData) complexData;
		String instruction = moduleComplexData.getInstruction();
		if (instruction.equals(ValueComplex.INSTRUCTION_NONE)) {
			return null;
		}
		return moduleComplexData;
	}
	
	@Override
	final public Obs getObs(Obs obs, String view) {
		
		ValueComplex valueComplex = new ValueComplex(obs.getValueComplex());
		if (!valueComplex.isOwnImplementation()) { // not our implementation
			return getParent().getObs(obs, view);
		}
		
		ComplexData docData = readComplexData(obs, valueComplex, view);
		obs.setComplexData(docData);
		return obs;
	}
	
	@Override
	final public boolean purgeComplexData(Obs obs) {
		
		ModuleComplexData docData = fetchModuleComplexData(obs.getComplexData());
		if (docData == null) { // not our implementation
			if (obs.getComplexData() == null) {
				log.error("Complex data was null and hence was not purged for OBS_ID='" + obs.getObsId() + "'.");
				return false;
			} else {
				return getParent().purgeComplexData(obs);
			}
		}
		
		return deleteComplexData(obs, docData);
	}
	
	@Override
	final public Obs saveObs(Obs obs) {
		
		ModuleComplexData moduleComplexData = fetchModuleComplexData(obs.getComplexData());
		if (moduleComplexData == null) { // not our implementation
			if (obs.getComplexData() == null) {
				log.error("Complex data was null and hence was not saved for OBS_ID='" + obs.getObsId() + "'.");
				return obs;
			} else {
				return getParent().saveObs(obs);
			}
		}
		
		ValueComplex valueComplex = saveComplexData(obs, moduleComplexData);
		obs.setValueComplex(valueComplex.getValueComplex());
		return obs;
	}
}
