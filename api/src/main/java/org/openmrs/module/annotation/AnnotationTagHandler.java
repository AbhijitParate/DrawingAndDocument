package org.openmrs.module.annotation;

import org.openmrs.module.htmlformentry.BadFormDesignException;
import org.openmrs.module.htmlformentry.FormEntrySession;
import org.openmrs.module.htmlformentry.handler.AbstractTagHandler;
import org.openmrs.ui.framework.BasicUiUtils;
import org.openmrs.ui.framework.UiUtils;
import org.openmrs.ui.framework.page.PageAction;
import org.w3c.dom.Node;

import java.io.PrintWriter;

public class AnnotationTagHandler extends AbstractTagHandler {
	
	@Override
	public boolean doStartTag(FormEntrySession session, PrintWriter out, Node parent, Node node)
	        throws BadFormDesignException {
		//		UiUtils uiUtils = (UiUtils) session.getAttribute("uiUtils");
		UiUtils uiUtils = new BasicUiUtils();
		//		if (uiUtils == null) {
		//			throw new IllegalArgumentException("Cannot use " + node.getNodeName() + " tag if no UiUtils object is available");
		//		}
		try {
			out.print(uiUtils.includeFragment("annotation", "editor"));
		}
		catch (PageAction pageAction) {
			pageAction.printStackTrace();
			throw new IllegalStateException("Tried to include a fragment that threw a PageAction", pageAction);
		}
		return false;
	}
	
	@Override
	public void doEndTag(FormEntrySession session, PrintWriter out, Node parent, Node node) throws BadFormDesignException {
		
	}
}
