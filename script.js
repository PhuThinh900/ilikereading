// React Component (app.js)
class ReadingWithLee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loggedIn: false,
            chapters: [
                "Chương 1: Khởi đầu",
                "Chương 2: Cuộc hành trình",
                "Chương 3: Cuộc chạm trán",
                "Chương 4: Kết thúc"
            ],
            currentChapter: 0
        };
    }

    handleLogin = () => {
        if (this.state.username.trim()) {
            this.setState({ loggedIn: true });
        }
    };

    nextChapter = () => {
        if (this.state.currentChapter < this.state.chapters.length - 1) {
            this.setState({ currentChapter: this.state.currentChapter + 1 });
        }
    };

    prevChapter = () => {
        if (this.state.currentChapter > 0) {
            this.setState({ currentChapter: this.state.currentChapter - 1 });
        }
    };

    selectChapter = (event) => {
        this.setState({ currentChapter: parseInt(event.target.value) });
    };

    render() {
        return (
            <div className="container">
                <h1>READING WITH LEE</h1>
                {!this.state.loggedIn ? (
                    <div id="login-section">
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={(e) => this.setState({ username: e.target.value })}
                            placeholder="Nhập tên người dùng"
                        />
                        <button onClick={this.handleLogin}>Đăng nhập</button>
                    </div>
                ) : (
                    <div id="reader-section">
                        <h2>{this.state.chapters[this.state.currentChapter]}</h2>
                        <div className="buttons">
                            <button onClick={this.prevChapter} disabled={this.state.currentChapter === 0}>
                                Chương trước
                            </button>
                            <button onClick={this.nextChapter} disabled={this.state.currentChapter >= this.state.chapters.length - 1}>
                                Chương tiếp theo
                            </button>
                            <select onChange={this.selectChapter} value={this.state.currentChapter}>
                                {this.state.chapters.map((chapter, index) => (
                                    <option key={index} value={index}>{chapter}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

// Render component vào #root
ReactDOM.render(<ReadingWithLee />, document.getElementById("root"));
                              
