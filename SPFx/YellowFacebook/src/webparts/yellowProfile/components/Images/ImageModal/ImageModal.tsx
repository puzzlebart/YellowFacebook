import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import styles from './ImageModal.module.scss';
import { IImageModalProps } from './IImageModalProps';

export default class ImageModal extends React.Component<IImageModalProps, {}> {
  public render() {
    return (
      <div>
        <Modal
          isOpen={true}
          onDismiss={() => this._onDismiss()}
        >
          <div className={styles.container}>
            <img src={this.props.image} />
          </div>
        </Modal>
      </div>
    );
  }
  private _onDismiss() {
    this.props.closeModal();
  }
}
