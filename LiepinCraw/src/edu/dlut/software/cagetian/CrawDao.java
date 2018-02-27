package edu.dlut.software.cagetian;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import edu.dlut.software.cagetian.beans.JobDetail;
import edu.dlut.software.cagetian.beans.JobInfo;

public class CrawDao {
	private static Connection conn;
	private static String seed_url;
	public static int seed_id;
	static {
		try {
			Class.forName(MyConstants.JDBC_DRIVER);
			conn = DriverManager.getConnection(MyConstants.MYSQL_PATH + MyConstants.CONNECT_DB + MyConstants.MYSQL_PARAM,
					MyConstants.MYSQL_USER, MyConstants.MYSQL_PWD);
			conn.setAutoCommit(false);
			System.out.println("mysql connection have successful built ...");
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	public static String InitSeed() {
		String sql = "SELECT id,url FROM url_list WHERE flag=0";
		try {
			PreparedStatement pst = conn.prepareStatement(sql);
			ResultSet rs = pst.executeQuery();
			if (rs.next()) {
				seed_url = rs.getString(2);
				seed_id = rs.getInt(1);
				sql = "UPDATE url_list SET flag = 1 WHERE id = ?";
				pst = conn.prepareStatement(sql);
				pst.setInt(1, seed_id);
				pst.executeUpdate();
			}
			conn.commit();
			rs.close();
			pst.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return seed_url;
	}

	public static void updateCrawPage(int currentPage) {
		String sql = "UPDATE url_list SET pages=? WHERE id=?";
		try {
			PreparedStatement pst = conn.prepareStatement(sql);
			pst.setInt(1, currentPage);
			pst.setInt(2, seed_id);
			pst.executeUpdate();
			conn.commit();
			pst.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

	public static void insertJobInfo(List<JobInfo> jobInfo_li) {
		// 加判段url是否重複
		String sql = "INSERT INTO job_info(url,job_name,salary_low,salary_high,"
				+ "area,degree,exprience,send_time,company_name,industry,temptation,id_type)" 
				+ "VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
		try {
			PreparedStatement pst = conn.prepareStatement(sql);
			Iterator<JobInfo> it = jobInfo_li.iterator();
			JobInfo jobInfo;
			while (it.hasNext()) {
				jobInfo = it.next();
				pst.setString(1, jobInfo.getUrl());
				pst.setString(2, jobInfo.getJob_name());
				pst.setInt(3, jobInfo.getSalary_low());
				pst.setInt(4, jobInfo.getSalary_high());
				pst.setString(5, jobInfo.getArea());
				pst.setInt(6, jobInfo.getDegree());
				pst.setInt(7, jobInfo.getExprience());
				pst.setDate(8, jobInfo.getSend_time());
				pst.setString(9, jobInfo.getCompany_name());
				pst.setString(10, jobInfo.getIndustry());
				pst.setString(11, jobInfo.getTemptation());
				pst.setString(12, jobInfo.getId_type());
				pst.executeUpdate();
				conn.commit();
			}

			pst.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static synchronized String selectJobInfoUrl() {

		String sql = "SELECT url FROM job_info WHERE flag = 0 ORDER BY id";
		PreparedStatement pst;
		ResultSet rs;
		String url = null;
		try {
			pst = conn.prepareStatement(sql);
			rs = pst.executeQuery();
			if (rs.next()) {
				url = rs.getString(1);
				sql = "UPDATE job_info SET flag = 1 WHERE url = ?";
				pst = conn.prepareStatement(sql);
				pst.setString(1, url);
				pst.executeUpdate();
			}
			conn.commit();
			rs.close();
			pst.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return url;
	}

	public static void insertDetail(JobDetail jobdetail) {
		String sql = "INSERT INTO job_detail(url,detail)VALUES(?,?)";
		try {
			PreparedStatement pst = conn.prepareStatement(sql);
			pst.setString(1, jobdetail.getUrl());
			pst.setString(2, jobdetail.getDetail());
			pst.executeUpdate();
			conn.commit();
			pst.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
