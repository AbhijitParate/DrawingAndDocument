package org.openmrs.module.docsanddrawing.web.controller.parser;

import org.json.JSONObject;
import org.openmrs.ui.framework.SimpleObject;

import java.util.ArrayList;
import java.util.List;

public class ParsedObs {
	
	private List<SimpleObject> obs = new ArrayList<SimpleObject>();
	
	private SimpleObject drawing;
	
	private SimpleObject json;
	
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
	
	public SimpleObject getJson() {
		return json;
	}
	
	public void setJson(SimpleObject json) {
		this.json = json;
	}
}
