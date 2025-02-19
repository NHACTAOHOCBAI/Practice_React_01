import { FacebookOutlined, GithubOutlined } from "@ant-design/icons"

const Footer = () => {
    return (
        <div style={{
            backgroundColor: "#000",
            color: "#fff",
            textAlign: "center",
            position: "fixed",
            bottom: 0,
            width: "100%",
            margin: "0px"
        }}>
            <div style={{ padding: 5, display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
                <a href="https://www.facebook.com/profile.php?id=100047067371826">
                    <FacebookOutlined style={{ fontSize: "24px", color: "#fff" }} />
                </a>
                <a href="https://github.com/NHACTAOHOCBAI">
                    <GithubOutlined style={{ fontSize: "24px", color: "#fff" }} />
                </a>
            </div>
            <div style={{ padding: 5, fontSize: "14px" }}>Copyright ©2025 , Designed by Cuhp2005</div>
        </div>
    )
}
export default Footer