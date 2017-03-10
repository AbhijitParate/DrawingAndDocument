package org.openmrs.module.annotation.fragment.controller.parser;

import org.openmrs.ui.framework.SimpleObject;

import java.util.ArrayList;
import java.util.List;

public class ParsedObs {
	
	private List<SimpleObject> obs = new ArrayList<SimpleObject>();
	
	private SimpleObject drawing;
	
	//	private List<SimpleObject> diagnoses = new ArrayList<SimpleObject>();
	
	//	private List<SimpleObject> dispositions = new ArrayList<SimpleObject>();
	
	public ParsedObs() {
		
	}
	
	public List<SimpleObject> getObs() {
		return obs;
	}
	
	public SimpleObject getDrawing() {
		return drawing;
	}
	
	public void setDrawing(SimpleObject drawing) {
		this.drawing = drawing;
	}
	
	//	public List<SimpleObject> getDiagnoses() {
	//		return diagnoses;
	//	}
	
	//	public void setDiagnoses(List<SimpleObject> diagnoses) {
	//		this.diagnoses = diagnoses;
	//	}
	//
	//	public List<SimpleObject> getDispositions() {
	//		return dispositions;
	//	}
	//
	//	public void setDispositions(List<SimpleObject> dispositions) {
	//		this.dispositions = dispositions;
	//	}
	
}
