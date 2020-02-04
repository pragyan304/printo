package com.printo.project.interfaces;

import java.util.Collection;
import java.util.List;
import com.printo.project.entities.PrintDetails;
public interface PrintLogServiceInterface {

	// get all print log data
	public List<PrintDetails> getAll();
	// get data by admin request
	public Collection<PrintDetails> getSeperated(PrintDetails ww);
	//download report
	public void downloadReport(PrintDetails pdata);
	//delete log 
	public void deleteLogData(int id);
	// get data by client request
	public Collection<PrintDetails> getUniqueData(PrintDetails p);
	
}
