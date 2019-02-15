import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Alert } from 'reactstrap';
// import neoImporter from '../../../shared/services/neoimporter.service';
dsadas
const PKPLACEHOLDER = '__pk__';
class Importer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            errorMessage: null
        };
    }

    render() {
        const { file } = this.state;
        const zoneStyle = {
            width: '100%',
            height: 150,
            border: '2px dashed #888',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        };
        return (
            <div className="row">
                {this.state.errorMessage ? (
                    <div className="col-md-12">
                        <div
                            className="alert alert-danger"
                            dangerouslySetInnerHTML={{
                                __html: this.state.errorMessage
                            }}
                        />
                    </div>
                ) : null}
                <div className="col-9">
                    <Dropzone
                        disableClick
                        accept=".xls, .xlsx"
                        multiple={false}
                        style={zoneStyle}
                        onDrop={this.onDrop}
                        onFileDialogCancel={this.onCancel}
                    >
                        {({ isDragActive, isDragReject, open }) => {
                            console.log({ isDragActive, isDragReject, open });

                            if (isDragActive) {
                                return <p>File accepted</p>;
                            }
                            if (isDragReject) {
                                return <p>Files rejected</p>;
                            }
                            return (
                                <React.Fragment>
                                    <p>Dropping file here ... or</p>
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => open()}
                                    >
                                        Browse File
                                    </button>
                                </React.Fragment>
                            );
                        }}
                    </Dropzone>
                    <br />
                    {file && <Alert>{file.name}</Alert>}
                    {this.props.fileId === null ? (
                        <button
                            disabled={file ? '' : 'disabled'}
                            className="btn btn-primary"
                            onClick={this.onSubmit}
                        >
                            Import File
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={this.onValidate}
                        >
                            Validate file
                        </button>
                    )}
                </div>
                <div className="col-3">
                    <div className="card">
                        <h5 className="card-header bg-primary text-white">
                            {this.props.contentType} template download
                        </h5>
                        <div className="card-body">
                            <p className="card-text">
                                Please use this importer to upload{' '}
                                {this.props.contentType
                                    ? this.props.contentType.replace(
                                          'Importer',
                                          ''
                                      )
                                    : null}{' '}
                                in XLS file. You can download a template file{' '}
                                <a
                                    target="_blank"
                                    href={`${
                                        process.env.REACT_APP_API_ENDPOINT_URL
                                    }${process.env.REACT_APP_API_VERSION}${
                                        this.props.template_file
                                    }?${this.serialize(
                                        this.props.extraParams
                                    )}`}
                                >
                                    here!
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onDrop = files => {
        const newFile = files[0];
        this.setState({ file: newFile, errorMessage: null });
    };
    onCancel = () => {
        this.setState({ file: null, errorMessage: null });
    };

    onValidate = () => {
        neoImporter
            .validateFileUploaded(
                this.props.validateUrl.replace(PKPLACEHOLDER, this.props.fileId)
            )
            .then(results => this.props.finished())
            .catch(err => {
                console.log(err);
            });
    };

    onSubmit = () => {
        neoImporter
            .fileUpload(
                this.props.processUrl,
                this.state.file,
                this.props.extraParams
            )
            .then(response => this.props.uploadSucessfull(response))
            .catch(err => {
                this.setState({
                    errorMessage: err.response.data.uploaded_file[0].replace(
                        'None',
                        `${process.env.REACT_APP_API_ENDPOINT_URL}${
                            process.env.REACT_APP_API_VERSION
                        }${this.props.template_file}?${this.serialize(
                            this.props.extraParams
                        )}`
                    )
                });
            });
    };

    serialize = function(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(
                    encodeURIComponent(p) + '=' + encodeURIComponent(obj[p])
                );
            }
        return str.join('&');
    };
}

Importer.propTypes = {};

export default Importer;
