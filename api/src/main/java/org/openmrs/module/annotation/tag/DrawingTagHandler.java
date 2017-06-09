package org.openmrs.module.annotation.tag;

import org.openmrs.module.htmlformentry.*;
import org.openmrs.module.htmlformentry.action.FormSubmissionControllerAction;
import org.openmrs.module.htmlformentry.element.HtmlGeneratorElement;
import org.openmrs.module.htmlformentry.handler.SubstitutionTagHandler;
import org.openmrs.module.htmlformentry.handler.TagHandler;
import org.openmrs.ui.framework.UiUtils;
import org.openmrs.ui.framework.page.PageAction;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.Map;

@Deprecated
public class DrawingTagHandler extends SubstitutionTagHandler implements TagHandler {
	
	public DrawingTagHandler() {
	}
	
	@Override
	protected String getSubstitution(FormEntrySession session, FormSubmissionController controllerActions,
	        Map<String, String> parameters) throws BadFormDesignException {
		
		UiUtils uiUtils = (UiUtils) session.getAttribute("uiUtils");
		
		DrawingEditorElement drawingEditorElement = new DrawingEditorElement(uiUtils);
		
		controllerActions.addAction(drawingEditorElement);
		
		return drawingEditorElement.generateHtml(session.getContext());
	}
	
	class DrawingEditorElement implements FormSubmissionControllerAction, HtmlGeneratorElement {
		
		UiUtils uiUtils;
		
		DrawingEditorElement(UiUtils uiUtils) {
			this.uiUtils = uiUtils;
		}
		
		@Override
		public Collection<FormSubmissionError> validateSubmission(FormEntryContext context, HttpServletRequest submission) {
			
			return null;
		}
		
		@Override
		public void handleSubmission(FormEntrySession session, HttpServletRequest request) {
			
		}
		
		@Override
		public String generateHtml(FormEntryContext context) {
			
			StringBuilder sb = new StringBuilder();
			try {
				if (context.getMode() == FormEntryContext.Mode.VIEW) {
					sb.append(uiUtils.includeFragment("annotation", "encounterDetails"));
				} else {
					sb.append(uiUtils.includeFragment("annotation", "editor"));
				}
				return sb.toString();
			}
			catch (PageAction pageAction) {
				throw new IllegalStateException("Included fragment threw a PageAction", pageAction);
			}
		}
	}
}
