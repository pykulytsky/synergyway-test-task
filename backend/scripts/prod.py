import subprocess


def main():
    cmd = [
        "uwsgi",
        "--http",
        "0.0.0.0:8000",
        "--ini",
        "uwsgi.ini",
        "--master",
        "--process",
        "4",
        "--threads",
        "2"]
    subprocess.run(cmd)
