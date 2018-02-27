package edu.dlut.software.cagetian.beans;

import java.sql.Date;

public class JobInfo {
	private int id;
	private String id_type;
	
	private String url;
	private String job_name;
	private int salary_low;
	private int salary_high;
	private String area;
	//0无限制，1大专，2本科，3研究生
	private int degree;
	//0无限制,值为需要年份
	private int exprience;
	private Date send_time;
	private String company_name;
	//以#进行分割
	private String industry;
	//0是未处理detail，1是处理过detail
	private int flag;
	@Override
	public String toString() {
		return "JobInfo [id=" + id + ", url=" + url + ", job_name=" + job_name + ", salary_low=" + salary_low
				+ ", salary_high=" + salary_high + ", area=" + area + ", degree=" + degree + ", exprience=" + exprience
				+ ", send_time=" + send_time + ", company_name=" + company_name + ", industry=" + industry + ", flag="
				+ flag + ", temptation=" + temptation + "]";
	}
	public String getId_type() {
		return id_type;
	}
	public void setId_type(String id_type) {
		this.id_type = id_type;
	}
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getJob_name() {
		return job_name;
	}
	public void setJob_name(String job_name) {
		this.job_name = job_name;
	}
	public int getSalary_low() {
		return salary_low;
	}
	public void setSalary_low(int salary_low) {
		this.salary_low = salary_low;
	}
	public int getSalary_high() {
		return salary_high;
	}
	public void setSalary_high(int salary_high) {
		this.salary_high = salary_high;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public int getDegree() {
		return degree;
	}
	public void setDegree(int degree) {
		this.degree = degree;
	}
	public int getExprience() {
		return exprience;
	}
	public void setExprience(int exprience) {
		this.exprience = exprience;
	}
	public Date getSend_time() {
		return send_time;
	}
	public void setSend_time(Date send_time) {
		this.send_time = send_time;
	}
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	public String getIndustry() {
		return industry;
	}
	public void setIndustry(String industry) {
		this.industry = industry;
	}
	public String getTemptation() {
		return temptation;
	}
	public void setTemptation(String temptation) {
		this.temptation = temptation;
	}
	private String temptation;
	

}
