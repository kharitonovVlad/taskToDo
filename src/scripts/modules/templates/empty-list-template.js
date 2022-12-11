import { ImageService } from '../services/image-service';

function emptyListTemplate(message, marginTopVH) {
  return `<div style="margin-top: ${marginTopVH}vh;">
            <div style="text-align: center;">
              ${ImageService.empty}
            </div>
            <h3 style="text-align: center;">
              ${message}
            </h3>
          </div>`;
}

export default emptyListTemplate;
